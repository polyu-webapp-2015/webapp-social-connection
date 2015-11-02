package models


import java.io.{FileInputStream, FileNotFoundException}
import java.util.concurrent.locks.ReentrantReadWriteLock

import models.idl.social_connection.{GeneralException, ResultCodeEnum, User}
import play.api.Logger
import play.api.libs.json._
import utils.Debug._
import utils.Lang
import utils.Lang.digest

import scala.language.postfixOps
import scala.reflect.io.File

/**
 * This instance simulate the function of a database by manipulating on a json file
 */
object DatabaseHelper {

  val Failed_to_get_user_list_Exception: GeneralException = new GeneralException(ResultCodeEnum.Database_Corrupt.value(), "failed to get user list")
  val Failed_to_parse_user_from_database_Exception: GeneralException = new GeneralException(ResultCodeEnum.Database_Corrupt.value(), "failed to parse user from Database")
  private var thread: Thread = null
  private var shouldRun = false

  @throws(classOf[GeneralException])
  def setUser(userId: String, key: String, value: JsValue) = {
    CachedDatabaseInstance.forWrite(root => {
      val oldUser = getUser(userId, throwUserNotFoundException = true, root).get
      val newUser = oldUser.jsObject ++ JsObject(Map(key -> value))
      val newUsers = root.value.get("users") match {
        case None => throw Failed_to_get_user_list_Exception
        case Some(users) => JsObject(users.as[JsObject].value ++ Map(oldUser.userId() -> newUser))
      }
      newUsers
      val newRoot = root
      (newRoot, None)
    })
    //TODO
  }

  def newUser(data: Map[String, JsValue]): User = CachedDatabaseInstance.forWrite[User](root=>  {
    val userId = Lang.repeat[String](generateUserId) until (_userId=> getUser(userId=_userId,root = root) isEmpty)
    root.value.get("users")match {
    case None=> throw Failed_to_get_user_list_Exception
    case Some(oldUsers)=>
      try{
        val newNode:JsObject = JsObject(
          Map("userId"->JsString(userId))
          ++ data
        )
        logDatabaseInfo("creating new user "+newNode.toString())
        val newUserObject=models.impl.social_connection.User.newInstance(newNode)
        val newUsers:JsObject = oldUsers.as[JsObject]++ JsObject(Map(userId->newNode))
        val newRoot=root + ("users"->newUsers)
        (newRoot,newUserObject)
      }catch {
        case e:JsResultException=>
          Logger.debug(e.toString)
          throw Failed_to_parse_user_from_database_Exception
      }
    }
  }
  )

  @throws(classOf[GeneralException])
  def getUser(userId: String, throwUserNotFoundException: Boolean = false, root: JsObject = null): Option[User] = {
    if (root == null) {
      CachedDatabaseInstance.forRead[Option[User]](root=> getUser(userId,throwUserNotFoundException,root))
    } else {
      root.value.get("users")
      match {
        case None => throw Failed_to_get_user_list_Exception
        case Some(users) =>
          try {
            users.as[JsObject].value.get(userId) match {
              case None => /*user not found*/
                if (throwUserNotFoundException) throw User_Not_Exist_Exception("userId", userId) else None
              case Some(user) => Some(models.impl.social_connection.User.newInstance(user.as[JsObject]))
            }
          } catch {
            case e: JsResultException =>
              Logger.debug(e.toString)
              throw Failed_to_parse_user_from_database_Exception
          }
      }
    }
  }

  /**
   * @param emailOrPhoneNum : phoneNum or email
   **/
  @throws(classOf[GeneralException])
  def findUserByEmailOrPhoneNum(emailOrPhoneNum: String, throwUserNotFoundException: Boolean = false): Option[User] = {
    val key = if (emailOrPhoneNum.contains('@')) "email" else "phoneNum"
    findUser(key, JsString(emailOrPhoneNum), throwUserNotFoundException)
  }

  @throws(classOf[GeneralException])
  def findUser(key: String, value: JsValue, throwUserNotFoundException: Boolean = false): Option[User] =
    CachedDatabaseInstance.forRead[Option[User]](root => {
      root.value.get("users") match {
        case None => throw Failed_to_get_user_list_Exception
        case Some(users)=>try{
        val matchedUsers = users.as[JsObject].values.filter(
          _.as[JsObject].value.get(key)match {
            case None=>false
            case Some(v)=>v.equals(value)
          }
        )
        if(matchedUsers.isEmpty){
          /*User not Found*/
          if(throwUserNotFoundException)
            throw User_Not_Exist_Exception(key,value.toString())
          else
            None
        } else
          Some(models.impl.social_connection.User.newInstance(matchedUsers.head.as[JsObject]))
        }catch {
          case e: GeneralException =>
            logDatabaseDebug (e.getClass.getName+":"+e.resultCode+ "->"+e.reason)
            throw e
          case e: Exception =>
            logDatabaseError(e.toString)
            throw Failed_to_parse_user_from_database_Exception
        }
      }
    }
  )

  def User_Not_Exist_Exception(key: String, value: String): GeneralException = {
    new GeneralException(ResultCodeEnum.User_Not_Exist.value(), key + "=" + value)
  }

  def init() = {
    thread = new Thread(new Runnable {
      override def run(): Unit = {
        try {
          shouldRun = true
          while (shouldRun) {
            Thread.sleep(1000 * 10)
            if (CachedDatabaseInstance.isChanged)
              CachedDatabaseInstance.save()
            else
              logDatabaseUpdaterDebug("Database content not changed, skip saving")
          }
        }
        catch {
          case e: InterruptedException =>
            logDatabaseUpdaterDebug("The Database updater thread is interrupted")
        }
      }
    }, "DatabaseUpdater-Thread")
    thread start()
  }

  def deInit() = {
    shouldRun = false
    CachedDatabaseInstance.save()
  }

  private def generateUserId: String = digest("" + System.currentTimeMillis() + System.nanoTime())

  object CachedDatabaseInstance {
    private val readWriteLock = new ReentrantReadWriteLock()
    private var cache: JsObject = null
    private var changed = false

    def isChanged = changed

    def change() = changed = true

    def forRead[A](apply: JsObject => A): A = {
      readWriteLock.readLock().lock()
      var xs = List.empty[A]
      var exception: Exception = null
      try
        xs = List(apply(cache))
      catch {
        case e: Exception => exception = e
      }
      readWriteLock.readLock().unlock()
      if (exception == null)
        xs.head
      else
        throw exception
    }

    def forWrite[A](apply: JsObject => (JsObject, A)): A = {
      readWriteLock.writeLock().lock()
      var exception: Exception = null
      var xs = List.empty[A]
      try {
        val (newRoot, x) = apply(cache)
        xs = List(x)
        cache = newRoot
        changed = true
      } catch {
        case e: Exception => exception = e
      }
      readWriteLock.writeLock().unlock()
      if (exception == null)
        xs.head
      else
        throw exception
    }

    def save() = {
      if (changed) {
        logDatabaseInfo("saving Database File")
        File(Path.DB_FILE).writeAll(cache.toString())
        logDatabaseInfo("saved Database File")
        changed = false
      } else
        logDatabaseDebug("skip saving Database File (not changed)")
    }

    def load() = {
      try {
        logDatabaseInfo("loading Database File")
        cache = Json.parse(new FileInputStream(Path.DB_FILE)).as[JsObject]
        logDatabaseInfo("loaded Database File")
      } catch {
        case e: FileNotFoundException =>
          logInfo("Database File not found, creating empty instance")
          cache = Json.obj("createTime" -> System.currentTimeMillis(),
            "users" -> Json.obj())
        case e: JsResultException =>
          logDatabaseError("Error: failed to parse Database File (format error)")
          throw e
        case e: Exception =>
          logDatabaseError("Error: failed to load Database File (no permission?)")
          throw e
      }
      changed = false
    }

    load()
  }

  init()

  object Path {
    //    val DB_FILE = "db.json"
    val DB_FILE = "public/db.json"
    val User = "/"
  }

}
