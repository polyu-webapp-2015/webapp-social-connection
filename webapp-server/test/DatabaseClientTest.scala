import java.io.PrintStream
import java.net.Socket

import scala.io.BufferedSource

/**
  * Created by beenotung on 11/16/15.
  */
object DatabaseClientTest extends App {
  override def main(args: Array[String]) {
    val socket = new Socket("localhost", 9999)
    val in = new BufferedSource(socket.getInputStream)
    val out = new PrintStream(socket.getOutputStream)
    out.println("test")
    out.close()
    socket.close()
  }
}
