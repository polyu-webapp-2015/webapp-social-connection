import spray.routing.HttpService

/**
 * Created by beenotung on 10/26/15.
 */
trait GeotrellisService extends HttpService {
  def pingRoute = path("ping") {
    get {
      complete("pong!")
    }
  }

  def pongRoute = path("pong") {
    get {
      complete("pong!?")
    }
  }

  def rootRoute = pingRoute ~ pongRoute
}
