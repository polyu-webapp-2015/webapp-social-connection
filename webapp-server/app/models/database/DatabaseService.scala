package models.database

import java.io.{BufferedReader, InputStreamReader, PrintStream}
import java.net.{BindException, ServerSocket, Socket}
import java.util.concurrent.ConcurrentHashMap

import models.database.DatabaseHelper.CachedDatabaseInstance.{forRead, forWrite}
import models.database.KeyJsValue
import play.api.libs.json.{Json, JsObject, JsString}

//import play.api.libs.json._
import utils.Debug.{logDatabaseDebug, logDatabaseInfo}
import utils.Lang.trim

/**
  * Created by beenotung on 11/16/15.
  */
object DatabaseService {
  private val workers = new ConcurrentHashMap[Socket, WorkerThread]()
  var PORT = 9001
  private var inited = false
  private var server: ServerSocket = null
  private var serverThread: ServerThread = null
  private var shouldRun = false

  def ready = serverThread != null

  def init(): Unit = {
    this.synchronized({
      if (inited) return
      inited = true
      logDatabaseInfo("DatabaseService init")
      serverThread = new ServerThread
      while (server == null)
        try {
          server = new ServerSocket(PORT)
        } catch {
          case e: BindException =>
            logDatabaseDebug("DatabaseService tried port: " + PORT)
            PORT += 1
        }
      serverThread.start()
      logDatabaseInfo("DatabaseService ready on port: " + PORT)
    })
  }

  def deInit() = {
    shouldRun = false
    if (server != null) {
      server.close()
      server = null
    }
  }

  class ServerThread extends Thread {
    override def run() = {
      shouldRun = true
      while (shouldRun) {
        logDatabaseDebug("waiting database client on port " + PORT)
        val client = server.accept()
        val clientAddress = client.getRemoteSocketAddress
        logDatabaseInfo("database client from " + clientAddress)
        val worker = new WorkerThread(client)
        workers.put(client, worker)
        worker.start()
      }
    }
  }

  class WorkerThread(client: Socket) extends Thread {
    val in = new BufferedReader(new InputStreamReader(client.getInputStream))
    val out = new PrintStream(client.getOutputStream)
    val ERROR = "error".toUpperCase
    val REQUEST = "request".toUpperCase
    val EXIST_UNDER = "exist_under".toUpperCase
    val CREATE_WITHOUT_ID = "create_without_id".toUpperCase
    val NEW_ID = "new_id".toUpperCase


    def convert(value: Seq[play.api.libs.json.JsValue]): Array[KeyJsValue] = {
      value.asInstanceOf[Seq[JsArray]].map(arr => new KeyJsValue(
        arr.value.head.as[JsString].value,
        arr.value.seq(1)
      )).toArray
    }

    override def run() = {
      logDatabaseDebug("receiving database request...")
      val requestRaw = in.readLine()
      logDatabaseDebug("received database request " + requestRaw)
      var response = JsObject(Map("result" -> JsString("Default")))
      try {
        val request = Json.parse(requestRaw).as[JsObject]
        val action = trim(request.value.get("action").get.toString(), "\"").toUpperCase.intern()
        val paths = request.value.get("path").get.as[JsArray].value.map(p => trim(p.toString(), "\"")).toArray
        val datas = convert(request.value.get("data").get.as[JsArray].value)
        action match {
          case EXIST_UNDER =>
            //            response = JsObject(Map(EXIST_UNDER -> JsBoolean(exist_under(paths, datas))))
            response = JsObject(Map(EXIST_UNDER -> JsBoolean(DatabaseServiceOperations.exist_under(paths, datas))))
          case CREATE_WITHOUT_ID =>
            response = create_without_id(paths, datas)
          case _ =>
            response = JsObject(Map(
              ERROR -> JsString("unknown action"),
              REQUEST -> request
            ))
        }
      } catch {
        case e: JsResultException =>
          response = JsObject(Map(
            ERROR -> JsString("request is not valid json object"),
            //            "exception" -> JsString(e.toString),
            REQUEST -> JsString(requestRaw)
          ))
        case e: Exception =>
          e.printStackTrace()
          response = JsObject(Map(
            ERROR -> JsString(e.toString),
            REQUEST -> JsString(requestRaw)
          ))
      }
      val responseRaw = response.toString()
      out.println(responseRaw)
      out.flush()
      out.close()
      client.close()
      logDatabaseDebug("finished db request " + responseRaw)
      workers.remove(client)
    }

    def create_without_id(path: Seq[String], data: Seq[JsValue]): JsObject = {
      try {
        val newId = forWrite[String](root => {
          /*locate*/
          /*new ID*/
          /*insert*/
        })
        JsObject(Map(
          NEW_ID -> JsString(newId)
        ))
      } catch {
        case e: Exception => JsObject(Map(
          ERROR -> JsString(e.toString)
        ))
      }
    }

    @deprecated
    def exist_under(paths: Seq[String], data: Seq[(String, JsValue)]): Boolean = {
      forRead[Boolean](root => {
        logDatabaseDebug("reading database")
        var currentNode = root
        paths.foreach(p => currentNode = currentNode.value.get(p).get.as[JsObject])
        currentNode.values.foreach(node => {
          //          logDatabaseDebug(s"checking ${node.toString()}")
          val child = node.as[JsObject]
          val found = data.forall(pair => {
            val pairSeq = pair.value.seq
            val key = trim(pairSeq.head.toString(), "\"")
            val value = pairSeq(1)
            //            logDatabaseDebug(s"comparing $key=>${value.toString()}")
            child.value.get(key) match {
              case None => false
              case Some(v) =>
                //                logDatabaseDebug(s"v=${v.toString()};value=${value.toString()}")
                v.toString().equals(value.toString())
            }
          })
          if (found) return true
        })
        return false
      })
    }
  }

}
