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
    val greet = request.body.asJson
    println(greet)
    Ok("Hello too" + greet)

  }

  def api = Action(parse.json) { request =>
    Ok("Building")
  }

  object Account {
    def getSessionId = Action {
      Ok("123")
    }
  }

}
