package controllers

import java.io.File
import java.util.Date
import javax.inject.Inject

import akka.actor.{Actor, ActorRef, PoisonPill, Props}
import config.Debug._
import models.idl.social_connection.{GeneralException, ResultCodeEnum, SexEnum}
import models.impl.GeneralObject.getParamValue
import models.impl.social_connection.UserManager
import org.omg.CORBA.BAD_PARAM
import play.api.Play.current
import play.api._
import play.api.libs.concurrent.Promise
import play.api.libs.iteratee.{Concurrent, Enumerator, Iteratee}
import play.api.libs.json._
import play.api.libs.ws._
import play.api.mvc._
import play.libs.Json

import scala.concurrent.ExecutionContext.Implicits.global

class Application @Inject()(ws: WSClient) extends Controller {

  // http endpoint to check that the server is running
  def index = Action {
    Ok("I'm alive!\n")
  }

  // endpoint that opens an echo websocket
  def wsEcho = WebSocket.using[String] {
    request => {
      Logger.info(s"wsEcho, client connected.")
      var channel: Option[Concurrent.Channel[String]] = None
      val outEnumerator: Enumerator[String] = Concurrent.unicast(c => channel = Some(c))

      val inIteratee: Iteratee[String, Unit] = Iteratee.foreach[String](receivedString => {
        // send string back
        Logger.info(s"wsEcho, received: $receivedString")
        channel.foreach(_.push(receivedString))
      })

      (inIteratee, outEnumerator)
    }
  }

  // sends the time every second, ignores any input
  def wsTime = WebSocket.using[String] {
    request =>
      Logger.info(s"wsTime, client connected.")

      val outEnumerator: Enumerator[String] = Enumerator.repeatM(Promise.timeout(s"${new java.util.Date()}", 1000))
      val inIteratee: Iteratee[String, Unit] = Iteratee.ignore[String]

      (inIteratee, outEnumerator)
  }

  // sends the time every second, ignores any input
  def wsPingPong = WebSocket.using[String] {
    request =>
      Logger.info(s"wsPingPong, client connected.")

      var switch: Boolean = true
      val outEnumerator = Enumerator.repeatM[String](Promise.timeout({
        switch = !switch
        if (switch) "                <----- pong" else "ping ----->"
      }, 1000))

      (Iteratee.ignore[String], outEnumerator)
  }

  // interleaves two enumerators
  def wsInterleave = WebSocket.using[String] {
    request =>
      Logger.info("wsInterleave, client connected")
      val en1: Enumerator[String] = Enumerator.repeatM(Promise.timeout("AAAA", 2000))
      val en2: Enumerator[String] = Enumerator.repeatM(Promise.timeout("BBBB", 1500))
      (Iteratee.ignore[String], Enumerator.interleave(en1, en2))
  }

  // sends content from a file
  def wsFromFile = WebSocket.using[Array[Byte]] {
    request =>
      Logger.info("wsFromFile, client connected")
      val file: File = new File("test.txt")
      val outEnumerator = Enumerator.fromFile(file)
      (Iteratee.ignore[Array[Byte]], outEnumerator.andThen(Enumerator.eof))
  }

  object EchoWebSocketActor {
    def props(out: ActorRef) = Props(new EchoWebSocketActor(out))
  }

  class EchoWebSocketActor(out: ActorRef) extends Actor {
    def receive = {
      case msg: String =>
        Logger.info(s"actor, received message: $msg")
        if (msg == "goodbye") self ! PoisonPill
        else out ! ("I received your message: " + msg)
    }
  }

  def wsWithActor = WebSocket.acceptWithActor[String, String] {
    request =>
      out => {
        Logger.info("wsWithActor, client connected")
        EchoWebSocketActor.props(out)
      }
  }

  // proxies another webservice
  def httpWeatherProxy = Action.async {
    request => {
      Logger.info("httpWeatherProxy, client connected")
      val url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl"
      ws.url(url).get().map(r => Ok(r.body))
    }
  }

  // proxies another webservice, websocket style
  def wsWeatherProxy = WebSocket.using[String] {
    request =>
      Logger.info("wsWeatherProxy, client connected")
      val url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl"
      var switch = false
      val myEnumerator: Enumerator[String] = Enumerator.generateM[String](ws.url(url).get().map(r => {
        switch = !switch
        if (switch) Option(r.body)
        else None
      }))
      (Iteratee.ignore[String], myEnumerator)
  }

  // proxies another webservice at regular intervals
  def wsWeatherIntervals = WebSocket.using[String] {
    request =>
      Logger.info("wsWeatherIntervals, client connected")
      val url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl"
      val outEnumerator = Enumerator.repeatM[String]({
        Thread.sleep(3000)
        ws.url(url).get().map(r => s"${new java.util.Date()}\n ${r.body}")
      })

      (Iteratee.ignore[String], outEnumerator)
  }

  def httpTime = Action {
    request =>
      val now: String = s"${new Date()}"
      Logger.info(s"httpTime, client connected. " + now)
      Ok(now)
  }

  def httpEcho = Action { request =>
    Logger.info(s"httpEcho, client connected.")
    val rawBody = request.body.asRaw
    val bodyBytes = rawBody flatMap {
      x: RawBuffer => x.asBytes(65536)
    } getOrElse (Array.empty[Byte])
    Logger.info("request: ")
    Logger.info(request.body.asFormUrlEncoded.getOrElse("none" -> "none").toString())
    Ok(request.body.asText.getOrElse("{}"))
      .withHeaders(ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*"))
  }

  def httpAdd = Action { request =>
    Logger.info(s"httpEcho, client connected.")
    val rawBody = request.body.asRaw
    val bodyBytes = rawBody flatMap {
      x: RawBuffer => x.asBytes(65536)
    } getOrElse (Array.empty[Byte])
    //    Logger.info("request: ")
    var responseData = "[\"error\":\"wrong format\"]"
    val requestData = request.body.asFormUrlEncoded
    //    Logger.info(request.body.asFormUrlEncoded.getOrElse("error" -> "wrong request format").toString())
    request.body.asFormUrlEncoded match {
      case Some(data) =>
        val dataParam = data.get("data")
        Logger.info("dataParam=" + dataParam)
        val str = dataParam.get.mkString
        Logger.info("str=" + str)
        val json = Json.parse(str)
        val c = json.get("a").asDouble() + json.get("b").asDouble()
        Ok(scala.util.parsing.json.JSONObject(Map("c" -> c)).toString())
          .withHeaders(ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*"))
      case None =>
        Logger.info("dataParam=none")
        BadRequest("wrong format")
          .withHeaders(ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*"))
    }
    //    Ok(request.body.asText.getOrElse("{}"))
    //      .withHeaders(ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*"))
  }

  /*-----------------real work start here--------------*/
  def commonHeader(request: Request[AnyContent]): (String, String) = (ACCESS_CONTROL_ALLOW_ORIGIN, (request.headers.get(ORIGIN).getOrElse("*")))

  def commonResponse(request: Request[AnyContent],
                     action: String,
                     sessionId: String = "0",
                     resultCode: Int = ResultCodeEnum.Success.value(),
                     reason: String = "",
                     params: Map[String, JsValue] = null): Result = {
    var responseJson = new JsObject(Map(
      "sessionId" -> JsString(sessionId),
      "action" -> JsString(action),
      "resultCode" -> JsNumber(resultCode),
      "reason" -> JsString(reason)
    ))
    if (params != null)
      responseJson += ("params" -> JsObject(params))
    val responseBody = responseJson.toString()
    if (resultCode.equals(ResultCodeEnum.Success.value()))
      Ok(responseBody).withHeaders(commonHeader(request))
    else
      BadRequest(responseBody).withHeaders(commonHeader(request))
  }

  def actionEntryLog(action: String) = logInfo(action + ", client connected")

  def isEmailOrPhoneNumUnique = Action { request =>
    val action = "isEmailOrPhoneNumUnique"
    try {
      commonResponse(request, action, params = Map(
        action -> JsBoolean(
          UserManager.isEmailOrPhoneNumUnique(
            getParamValue[String](request,"emailOrPhoneNum")
          ))))
    } catch {
      case e: GeneralException =>
        commonResponse(request, action, resultCode = e.resultCode, reason = e.getMessage)
    }
  }

  def createUser = Action { request =>
    val action = "createUser"
    actionEntryLog(action)
    try {
      try {
        val sex: SexEnum = SexEnum.from_int(getParamValue[Int](request,"sex"))
        val emailOrPhoneNum: String = getParamValue[String](request,"emailOrPhoneNum")
        val password: String = getParamValue[String](request,"password")
        val userId = UserManager.createUser(
          emailOrPhoneNum,
          password,
          sex
        )
        /*auto login*/
        val sessionId = UserManager.newSessionId(emailOrPhoneNum, password)
        commonResponse(request, action, sessionId)
      } catch {
        case e: BAD_PARAM => throw new GeneralException("sex", ResultCodeEnum.Request_Wrong_Format.value())
      }
    } catch {
      case e: GeneralException =>
        commonResponse(request, action, resultCode = e.resultCode, reason = e.getMessage)
    }
  }

  def newSessionId = Action { request =>
    val action = "getSessionId"
    actionEntryLog(action)
    try {
      val sessionId = UserManager.newSessionId(
        getParamValue[String](request,"username"),
        getParamValue[String](request,"password")
      )
      commonResponse(request, sessionId, action)
    } catch {
      case e: GeneralException =>
        commonResponse(request, "0", action, e.resultCode, e.getMessage)
    }
  }
}
