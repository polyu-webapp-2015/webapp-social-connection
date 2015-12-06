package models.database

import models.database.DatabaseHelper.CachedDatabaseInstance.{forRead, forWrite}
import models.idl.database
import utils.Debug.logDatabaseDebug
import utils.Lang

/**
  * Created by beenotung on 11/19/15.
  */
object DatabaseServiceOperations extends models.idl.database.DatabaseServiceOperations {
  @throws(classOf[DatabaseException])
  def gotoPath(root: JsObject, paths: Array[String]): JsObject = {
    var currentNode = root
    paths.foreach(p => currentNode = currentNode.value.get(p) match {
      case None => throw new DatabaseException(DatabaseResultCodeEnum._Path_Not_Exist, paths.toString())
      case Some(child) => child.as[JsObject]
    })
    currentNode
  }

  override def exist_under(paths: Array[String], keyJsValues: Array[database.KeyJsValue]): Boolean = {
    forRead[Boolean](root => {
      logDatabaseDebug("reading database")
      val parentNode = gotoPath(root, paths)
      //      var currentNode = root
      //      paths.foreach(p => currentNode = currentNode.value.get(p).get.as[JsObject])
      parentNode.values.foreach(node => {
        //          logDatabaseDebug(s"checking ${node.toString()}")
        val child = node.as[JsObject]
        val found = keyJsValues.forall(keyJsValue => {
          //          val pairSeq =  pair.value.seq
          //          val key = trim(pairSeq.head.toString(), "\"")
          //          val value = pairSeq(1)
          //          val key = keyJsValue.key()
          //          val value = keyJsValue.jsValue()
          //          Debug.logDatabaseDebug(s"comparing $key=>${value.toString()}")
          child.value.get(keyJsValue.key()) match {
            case None => false
            case Some(v) =>
              //                logDatabaseDebug(s"v=${v.toString()};value=${value.toString()}")
              v.toString().equals(keyJsValue.jsValue().toString)
          }
        })
        if (found) return true
      })
      return false
    })
  }


  def generateId: String = Lang.digest("" + System.currentTimeMillis() + System.nanoTime())

  def mergeIntoRoot(root: JsObject, paths: Array[String], jsObject: JsObject): JsObject = {
    /*convert jsObject into full path location*/
    val partialRoot = paths.foldRight(jsObject)((p, o) => JsObject(Map(p -> o)))
    root ++ partialRoot
  }

  override def create_without_id(paths: Array[String], keyJsValues: Array[database.KeyJsValue]): String = {
    try {
      val newId = forWrite[String](root => {
        /*locate*/
        val parentNode = gotoPath(root, paths)
        /*new ID*/
        val id = Lang.repeat(generateId) until (id => !parentNode.value.keySet.contains(id))
        /*create node*/
        val newNode = JsObject(keyJsValues.map(pair => pair.key() -> pair.jsValue()).toMap[String, JsValue])
        /*update root*/
        val newRoot = mergeIntoRoot(root, paths, newNode)
        /*return new ID*/
        (newRoot, id)
      })
      newId
      //      JsObject(Map(
      //        models.idl.database.DatabaseService.NEW_ID -> JsString(newId)
      //      ))
    } catch {
      case e: Exception => throw new DatabaseException(DatabaseResultCodeEnum._Failed_Unknown, e.toString)
      //        JsObject(Map(        ERROR -> JsString(e.toString)      ))
    }
  }
}
