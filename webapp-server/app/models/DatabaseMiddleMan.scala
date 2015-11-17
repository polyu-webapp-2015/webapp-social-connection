package models

import java.io.{BufferedReader, InputStreamReader, PrintStream}
import java.net.{BindException, ServerSocket, Socket}
import java.util.concurrent.ConcurrentHashMap

import utils.Debug.{logDatabaseDebug, logDatabaseInfo}

/**
  * Created by beenotung on 11/16/15.
  */
object DatabaseMiddleMan {
  var PORT = 9999
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

    override def run = {
      logDatabaseDebug("db middle man : reading input from client")
      val s = in.readLine()
      logDatabaseDebug("input db request =" + s)
      out.println(s)
      out.flush()
      out.close()
      client.close()
      logDatabaseDebug("finished db request")
      workers.remove(client)
    }
  }

}
