package controllers

import actors.StreamMergingActor.OrientationChangeEvent
import actors._
import akka.actor.Props
import akka.util.Timeout
import json.JsonFormats._
import play.api.Play.current
import play.api.libs.iteratee.{Concurrent, Iteratee}
import play.api.libs.json.JsValue
import play.api.mvc._
import utils.IpAddress

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

object Application extends Controller with IpAddress {

  val (dataEnumerator, dataChannel) = Concurrent.broadcast[JsValue]

  implicit val timeout = Timeout(2 second)

  def index = Action {
    println(getIpAddresses())
    println(Runtime.getRuntime().availableProcessors())

    Ok(views.html.index(getIpAddresses()))
  }

  def mobileWebSocket = WebSocket.acceptWithActor[OrientationChangeEvent, JsValue] { request => out =>
    Props(new StreamMergingActor(dataChannel))
  }

  def dashboardWebSocket = WebSocket.using[JsValue] { request =>
    (Iteratee.ignore, dataEnumerator)
  }

  case class Greet(name: String, `type`: String)

  def hello = Action { request =>
    //   val greet = request.body.asJson
    // println(greet)
    Ok("hello")
  }

  def api = Action(parse.json) { request =>
    Ok("Building")
  }

  def calc = Action(parse.json) { request =>
    (request.body \ "name").asOpt[String].map { name =>
      Ok(toJson(
        Map("status" -> "OK", "message" -> ("Hello " + name))
      ))
    }.getOrElse {
      BadRequest(toJson(
        Map("status" -> "KO", "message" -> "Missing parameter [name]")
      ))
    }
    Ok("c")
      .withHeaders(ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*"))
  }

  case class WithCors(httpVerbs: String*)(action: EssentialAction) extends EssentialAction with Results {
    def apply(request: RequestHeader) = {
      implicit val executionContext: ExecutionContext = play.api.libs.concurrent.Execution.defaultContext
      var origin = request.headers.get(ORIGIN).getOrElse("*")
      if (request.method == "OPTIONS") {
        //preflight
        val corsAction = Action {
          request =>
            Ok("").withHeaders(
              ACCESS_CONTROL_ALLOW_ORIGIN -> origin,
              ACCESS_CONTROL_ALLOW_METHODS -> (httpVerbs.toSet + "OPTIONS").mkString(", "),
              ACCESS_CONTROL_MAX_AGE -> "3600",
              ACCESS_CONTROL_ALLOW_HEADERS -> s"$ORIGIN, X-Requested-With, $CONTENT_TYPE, $ACCEPT, $AUTHORIZATION, X-Auth-Token",
              ACCESS_CONTROL_ALLOW_CREDENTIALS -> "true")
        }
        corsAction(request)
      } else {
        //actual request
        action(request).map(res => res.withHeaders(
          ACCESS_CONTROL_ALLOW_ORIGIN -> origin,
          ACCESS_CONTROL_ALLOW_CREDENTIALS -> "true"
        ))
      }
    }
  }

}
