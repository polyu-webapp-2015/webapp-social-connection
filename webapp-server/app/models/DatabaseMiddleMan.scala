package models

import java.io.{BufferedReader, InputStreamReader, PrintStream}
import java.net.{BindException, ServerSocket, Socket}
import java.util.concurrent.ConcurrentHashMap

import models.DatabaseHelper.CachedDatabaseInstance.forRead
import play.api.libs.json._
import utils.Debug.{logDatabaseDebug, logDatabaseInfo}
import utils.Lang
import utils.Lang.trim

/**
  * Created by beenotung on 11/16/15.
  */
object DatabaseMiddleMan {
  var PORT = 9001
  private var inited = false
  private var server: ServerSocket = null
  private var serverThread: ServerThread = null

  def ready = serverThread != null

  def init(): Unit = {
    this.synchronized({
      if (inited) return
      inited = true
      logDatabaseInfo("DatabaseMiddleMan init")
      serverThread = new ServerThread
      while (server == null)
        try {
          server = new ServerSocket(PORT)
        } catch {
          case e: BindException =>
            logDatabaseDebug("DatabaseMiddleMan tried port: " + PORT)
            PORT += 1
        }
      serverThread.start()
      logDatabaseInfo("DatabaseMiddleMan ready on port: " + PORT)
    })
  }

  def deInit() = {
    shouldRun = false
    if (server != null) {
      server.close()
      server = null
    }
  }

  private var shouldRun = false
  private val workers = new ConcurrentHashMap[Socket, WorkerThread]()

  class ServerThread extends Thread {
    override def run = {
      shouldRun = true
      while (shouldRun) {
        logDatabaseDebug("waiting database client on port " + PORT)
        val client = server.accept()
        val clientAddress = client.getRemoteSocketAddress
        logDatabaseInfo("database client from " + clientAddress)
        val worker = new WorkerThread(client)
        workers.put(client, worker)
        worker.start
      }
    }
  }

  class WorkerThread(client: Socket) extends Thread {
    val in = new BufferedReader(new InputStreamReader(client.getInputStream))
    val out = new PrintStream(client.getOutputStream)

    def exist_under(path: Seq[String], data: Seq[JsValue]): Boolean = {
      forRead[Boolean](root => {
        logDatabaseDebug("reading database")
        var currentNode = root
        path.foreach(p => currentNode = currentNode.value.get(p).get.as[JsObject])
        currentNode.values.foreach(node => {
//          logDatabaseDebug(s"checking ${node.toString()}")
          val child = node.as[JsObject]
          val found = data.forall(pair => {
            val pairSeq = pair.as[JsArray].value.seq
            val key = trim(pairSeq(0).toString(),"\"")
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

    val EXIST_UNDER = "exist_under".toUpperCase.intern()

    override def run = {
      logDatabaseDebug("receiving database request...")
      val requestRaw = in.readLine()
      logDatabaseDebug("received database request " + requestRaw)
      var responseRaw = "default response from database"
      try {
        val request = Json.parse(requestRaw).as[JsObject]
        val action = trim(request.value.get("action").get.toString(), "\"").toUpperCase.intern()
        val paths = request.value.get("path").get.as[JsArray].value.map(p => trim(p.toString(), "\""))
        val datas = request.value.get("data").get.as[JsArray].value
        action match {
          case EXIST_UNDER =>
            var response = JsObject(Map(EXIST_UNDER -> JsBoolean(exist_under(paths, datas))))
            responseRaw = response.toString()
          case _ =>
            responseRaw = "Error: unknown action"
            responseRaw += s"\naction=$action\npath=${paths}\ndata=$datas"
            datas.foreach(p => responseRaw += ("\n" + p.toString()))
        }
      } catch {
        case e: JsResultException =>
          responseRaw = "Error : request is not valid json object\n" + e.toString
        case e: Exception =>
          e.printStackTrace()
          responseRaw = "Error : " + e.toString + "\nrequest = " + requestRaw
      }
      out.println(responseRaw)
      out.flush()
      out.close()
      client.close()
      logDatabaseDebug("finished db request")
      workers.remove(client)
    }
  }

}
