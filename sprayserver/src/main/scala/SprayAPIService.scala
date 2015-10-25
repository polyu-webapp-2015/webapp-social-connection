import org.json4s.JsonAST.JObject
import org.json4s.{DefaultFormats, Formats}
import spray.httpx.Json4sSupport
import spray.routing.HttpService

/**
 * Created by beenotung on 10/26/15.
 */
object Json4sProtocol extends Json4sSupport {
  implicit def json4sFormats: Formats = DefaultFormats
}

trait SprayAPIService extends HttpService {
  def sessionId = path("sessionId") {
    get {
      complete("return session id")
    } ~ post {
      entity(as[JObject]) { request =>
        println("new session id " + request)
        complete("new session id")
      }
    }
  }

  def userId = path("userId" / Segment) { username =>
    get {
      complete("return user id by " + username)
    } ~ post {
      complete("create user id by" + username)
    }
  }

  def json

  def rootRoute = userId ~ sessionId
}
