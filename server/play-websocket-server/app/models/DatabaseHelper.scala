package models


import java.io.{FileInputStream, FileNotFoundException}
import java.util.concurrent.locks.ReentrantReadWriteLock

import config.Debug._
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
    val user = getUser(userId)
    //TODO
    CachedDatabaseInstance.change()
  }

  @throws(classOf[GeneralException])
  def getUser(userId: String): User = {
    CachedDatabaseInstance.forRead[User](root => {
      root.value.get("users")
      match {
        case Some(jsValue) =>
          try {
            jsValue.as[JsArray].value.find(jsValue => jsValue.as[JsObject].value.get("userId").get.as[JsString].value.equals(userId))
            match {
              case Some(value) =>
                 models.impl.social_connection.User.newInstance(value.as[JsObject])
              case None =>
                throw Failed_to_find_user_Exception("userId", userId)
            }
          } catch {
            case e: Exception =>
              throw Failed_to_parse_user_from_database_Exception
          }
        case None => throw Failed_to_get_user_list_Exception
      }
    })
  }

  def findUser(key: String, value: JsValue): User = {
    CachedDatabaseInstance.forRead[User](root => {
      root.value.get("users") match {
        case None => throw Failed_to_get_user_list_Exception
        case Some(jsValue) =>
          try {
            jsValue.as[JsArray].value.find(x => x.as[JsObject].value.get(key).get.equals(value)) match {
              case None => throw Failed_to_find_user_Exception(key, value.toString())
              case Some(x) =>
                models.impl.social_connection.User.newInstance(x.as[JsObject])
            }
          }
          catch {
            case _: Throwable => throw Failed_to_parse_user_from_database_Exception
          }
      }
    }
    )
  }

  def Failed_to_find_user_Exception(key: String, value: String): GeneralException = {
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

    def forWrite(apply: JsObject => ()) = {
      readWriteLock.writeLock().lock()
      apply(cache)
      changed = true
      readWriteLock.writeLock().unlock()
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
