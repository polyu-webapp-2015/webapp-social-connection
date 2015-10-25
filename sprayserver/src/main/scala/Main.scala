import akka.actor.{ActorSystem, Props}
import akka.io.IO
import com.typesafe.config.ConfigFactory
import spray.can.Http

/**
 * Created by beenotung on 10/26/15.
 */
object Main {
  def main_demo(args: Array[String]) {

    implicit val system = ActorSystem()

    val service = system.actorOf(Props[GeoTrellisServiceActor], "geotrellis-service")

    IO(Http) ! Http.Bind(service, interface = "localhost", port = 8000)
  }

  def main(args: Array[String]) {

    implicit val system=ActorSystem("SocialConnectionSystem",ConfigFactory.load("server.conf"))

    val  service=system.actorOf(Props[SprayAPIServiceActor],"spray-api-service")
    IO(Http)! Http.Bind(service,
      system.settings.config.getString("app.interface"),
      system.settings.config.getInt("app.port"))

    println("Hit any key to exit.")
    val result=readLine()
    system.shutdown()
  }
}
