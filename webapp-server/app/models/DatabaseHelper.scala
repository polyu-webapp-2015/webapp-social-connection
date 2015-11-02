package models


import java.io.{FileInputStream, FileNotFoundException}
import java.util.concurrent.locks.ReentrantReadWriteLock

import utils.Debug._
import utils.Utils
import Utils.messageDigest
import models.idl.social_connection.{GeneralException, ResultCodeEnum, User}
import play.api.Logger
import play.api.libs.json._

import scala.reflect.io.File

/**
 * This instance simulate the function of a database by manipulating on a json file
 */
object DatabaseHelper {

  val Failed_to_get_user_list_Exception: GeneralException = new GeneralException("failed to get user list", ResultCodeEnum.Database_Corrupt.value())
  val Failed_to_parse_user_from_database_Exception: GeneralException = new GeneralException("failed to parse user from Database", ResultCodeEnum.Database_Corrupt.value())
  private var thread: Thread = null
  private var shouldRun = true

  def setUser(userId: String, key: String, value: JsValue) = {
    val user = getUser(userId, true)
    //TODO
    CachedDatabaseInstance.change()
  }

  private def generateUserId: String = new String(messageDigest.digest("" + System.currentTimeMillis() + System.nanoTime() getBytes()))

  def newUser(data: Map[String, JsValue]): User = CachedDatabaseInstance.forWrite[User](root=>  {
    val userId = Utils.repeat[String](generateUserId) until (_userId=> getUser(userId=_userId,root = root) isEmpty)
    root.value.get("users")match {
    case None=> throw Failed_to_get_user_list_Exception
    case Some(oldUsers)=>
      try{
        val newNode:JsObject = JsObject(
          Map("userId"->JsString( userId))
          ++ data
        )
        val newUserObject=models.impl.social_connection.User.newInstance(newNode)
        val newUsers:JsArray = oldUsers.as[JsArray]:+ newNode
        val newRoot=root + ("users"->newUsers)
        (newRoot,newUserObject)
      }catch {
        case e:JsResultException=>throw Failed_to_parse_user_from_database_Exception
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
              throw Failed_to_parse_user_from_database_Exception
          }
      }
    }
  }

  @throws(classOf[GeneralException])
  def findUser(key: String, value: JsValue, throwUserNotFoundException: Boolean = false): Option[User] = {
    CachedDatabaseInstance.forRead[Option[User]](root => {
      root.value.get("users") match {
        case None => throw Failed_to_get_user_list_Exception
        case Some(jsValue) =>
          try {
            jsValue.as[JsArray].value.find(x => x.as[JsObject].value.get(key).get.equals(value)) match {
              case None =>
                if(throwUserNotFoundException)
                  throw User_Not_Exist_Exception(key,value.toString())
                else
                  None
              case Some(x) =>
                Some(models.impl.social_connection.User.newInstance(x.as[JsObject]))
            }
          }
          catch {
            case _: Throwable => throw Failed_to_parse_user_from_database_Exception
          }
      }
    }
    )
  }

  /**
   * @param emailOrPhoneNum : phoneNum or email
   **/
  @throws(classOf[GeneralException])
  def findUserByEmailOrPhoneNum(emailOrPhoneNum: String, throwUserNotFoundException: Boolean = false): Option[User] = {
    val key = if (emailOrPhoneNum.contains('@')) "email" else "phoneNum"
    findUser(key, JsString(emailOrPhoneNum), throwUserNotFoundException)
  }

  def User_Not_Exist_Exception(key: String, value: String): GeneralException = {
    new GeneralException(key + "=" + value, ResultCodeEnum.User_Not_Exist.value())
  }

  def init() = {
    thread = new Thread(new Runnable {
      override def run(): Unit = {
        try {
          while (shouldRun) {
            Thread.sleep(1000 * 10)
            if (CachedDatabaseInstance.isChanged)
              CachedDatabaseInstance.save()
            else
              logDatabase("content not changed, skip saving")
          }
        }
        catch {
          case e: InterruptedException =>
            logDatabase("The Database updater thread is interrupted")
        }
      }
    })
  }

  def deInit() = {
    shouldRun = false
    CachedDatabaseInstance.save()
  }

  object CachedDatabaseInstance {
    private val readWriteLock = new ReentrantReadWriteLock()
    private var cache: JsObject = null
    private var changed = false

    def isChanged = changed

    def change() = changed = true

    def forRead[A](apply: JsObject => A): A = {
      readWriteLock.readLock().lock()
      val x = apply(cache)
      readWriteLock.readLock().unlock()
      x
    }

    def forWrite[A](apply: JsObject => (JsObject, A)): A = {
      readWriteLock.writeLock().lock()
      val (newRoot, x) = apply(cache)
      cache = newRoot
      changed = true
      readWriteLock.writeLock().unlock()
      x
    }

    def save() = {
      if (changed) {
        logInfo("saving Database File")
        File(Path.DB_FILE).writeAll(cache.toString())
        logInfo("saved Database File")
        changed = false
      }
    }

    def load() = {
      try {
        cache = Json.parse(new FileInputStream(Path.DB_FILE)).as[JsObject]
        logInfo("loaded Database File")
      } catch {
        case e: FileNotFoundException =>
          logInfo("Database File not found, creating empty instance")
          cache = Json.obj("createTime" -> System.currentTimeMillis(),
            "users" -> JsArray())
        case e: JsResultException =>
          Logger.error("Error: failed to parse Database File (format error)")
          throw e
        case e: Exception =>
          Logger.error("Error: failed to load Database File (no permission?)")
          throw e
      }
      changed = false
    }

    load()
  }

  init()

  object Path {
    val DB_FILE = "db.json"
    val User = "/"
  }

}
