package models.impl

import models.idl.social_connection.{GeneralException, ResultCodeEnum}
import play.api.libs.json.{JsObject, JsResultException, JsString}
import play.api.mvc.{AnyContent, Request}

/**
 * Created by beenotung on 10/30/15.
 */
trait GeneralObject {
  val jsObject: play.api.libs.json.JsObject
}

trait GeneralObjectOperations {
  def toMap: Map[String, Any]

  def fromMap(map: Map[String, Any]): GeneralObject
}

object GeneralObject {
  @throws(classOf[GeneralException])
  def getParamValue[A](params: Map[String, Any], key: String): A = {
    params.get(key) match {
      case Some(value) =>
        value match {
          case v: A => v
          case _ => throw new GeneralException(key, ResultCodeEnum.Request_Param_Wrong_Type.value())
        }
      case None => throw new GeneralException(key, ResultCodeEnum.Request_Param_Missing.value())
    }
  }

  @throws(classOf[GeneralException])
  def getParamValue[A](request: Request[AnyContent], key: String): A = {
    request.body.asFormUrlEncoded match {
      case Some(params) =>
        getParamValue(params, key)
      case None =>
        throw new GeneralException(ResultCodeEnum.Request_Wrong_Format.value())
    }
  }

  @throws(classOf[JsResultException])
  def getString(jsObject: JsObject, key: String, defaultValue: String = ""): String = {
    jsObject.value.get(key) match {
      case None => defaultValue
      case Some(x) => x.as[JsString].value
    }
  }
}
