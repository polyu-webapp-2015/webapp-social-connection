package models


import java.io.{FileInputStream, FileNotFoundException}
import java.util.concurrent.Semaphore
import java.util.concurrent.locks.ReentrantReadWriteLock
import java.util.function.Consumer

import akka.actor.Actor
import akka.actor.Actor.Receive
import play.api.Logger
import play.api.libs.json.{JsValue, Json}

import scala.reflect.io.File

/**
 * This instance simulate the function of a database by manipulating on a json file
 */
object Database {

  object CachedInstance {
    private val readWriteLock = new ReentrantReadWriteLock()
    private val cacheLock = new Semaphore(1)
    private var cache: JsValue = null
    private var changed = false

    def forRead(consumer: Consumer[JsValue]) = {
      readWriteLock.readLock().lock()
      consumer.accept(cache)
      readWriteLock.readLock().unlock()
    }

    def forWrite(consumer: Consumer[JsValue]) = {
      readWriteLock.writeLock().lock()
      consumer.accept(cache)
      changed = true
      readWriteLock.writeLock().unlock()
    }

    def save() = {
      File(Path.DB_FILE).writeAll(cache.toString())
      changed = false
    }

    def load() = {
      try {
        cache = Json.parse(new FileInputStream(Path.DB_FILE))
        Logger.info("loaded Database File")
      } catch {
        case e: FileNotFoundException =>
          Logger.info("Database File not found, creating empty instance")
          cache = Json.obj("createTime" -> System.currentTimeMillis())
        case e: Exception =>
          Logger.error("Error: failed to load Database File")
          throw e
      }
      changed = false
    }
    load()
  }


  def setUser(id: String, key: String, value: Any) = {

  }




  object Path {
    val DB_FILE = "db.json"
    val User = "/"
  }

  val timerActor=new Actor {
    override def receive: Receive = {
reac
    }
  }
  def init={

  }
  init

}
