package controllers

import play.api._
import play.api.libs.json.Json
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def helloText = Action {
    Ok("Hello Client  --from Server")
  }

  def hello = Action {
    request => {
      System.out.println("--------------request-------------")
      println(request.headers.get(ORIGIN).getOrElse(" none "))
      val response = Ok("hello client").withHeaders(
        ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*"),
        ACCESS_CONTROL_ALLOW_METHODS -> "GET, POST, OPTIONS",
        ACCESS_CONTROL_ALLOW_HEADERS -> "Origin, Accept, Authorization, X-Auth-Token",
        ACCESS_CONTROL_ALLOW_CREDENTIALS -> "true"
      )
      println("----------------response-------------")
      println(response)
      response
    }
  }

  def api = Action(parse.json) { request =>
    (request.body \ "api").asOpt[String].map { api =>
      Ok(Json.toJson(Map("api" -> api))).as("text/json")
    }.getOrElse {
      BadRequest("Invalid API request")
    }
  }

  def getSessionId = Action {
    //    Ok(Json.toJson(Map("sessionId" -> 123)))
    request =>
      request.body.asJson.map { json =>
        (json \ "userId").asOpt[String].map { name =>
          Ok("Hello " + name).as("application/json").withHeaders(
            ACCESS_CONTROL_ALLOW_ORIGIN -> "*", // request.headers.get(ORIGIN).getOrElse("*"),
            ACCESS_CONTROL_ALLOW_METHODS -> "GET, POST, OPTIONS",
            ACCESS_CONTROL_ALLOW_HEADERS -> "Origin, Accept, Authorization, X-Auth-Token",
            ACCESS_CONTROL_ALLOW_CREDENTIALS -> "true"
            //            ACCESS_CONTROL_ALLOW_ORIGIN -> request.headers.get(ORIGIN).getOrElse("*")
            //           , ACCESS_CONTROL_ALLOW_METHODS -> (httpVerbs.toSet + "OPTIONS").mkString(", "),
            //            ACCESS_CONTROL_MAX_AGE -> "3600",
            //            ACCESS_CONTROL_ALLOW_HEADERS -> s"$ORIGIN, X-Requested-With, $CONTENT_TYPE, $ACCEPT, $AUTHORIZATION, X-Auth-Token",
            //            ACCESS_CONTROL_ALLOW_CREDENTIALS -> "true"
          )
        }.getOrElse {
          BadRequest("Missing parameter [name]")
        }
      }.getOrElse {
        BadRequest("Expecting Json data")
      }
  }

}