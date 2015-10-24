package controllers

import play.api._
import play.api.libs.json.Json
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def hello = Action {
    Ok("Hello Cliend  --from Server")
  }

  def api = Action(parse.json) { request =>
    (request.body \ "api").asOpt[String].map { api =>
      Ok(Json.toJson(Map("api" -> api))).as("text/json")
    }.getOrElse {
      BadRequest("Invalid API request")
    }
  }

}