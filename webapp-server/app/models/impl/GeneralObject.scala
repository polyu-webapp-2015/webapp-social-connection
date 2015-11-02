package models.impl

import java.io.IOException

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.JsonMappingException
import models.idl.social_connection.{GeneralException, ResultCodeEnum}
import play.api.libs.json._
import play.api.mvc.{AnyContent, Request}
import utils.Lang.getValue

import scala.reflect.ClassTag

/**
 * Created by beenotung on 10/30/15.
 */
trait GeneralObject {
  val jsObject: play.api.libs.json.JsObject
}

trait GeneralObjectOperations {
}

object GeneralObject {

  @deprecated("inefficient when called continuously", "0.5")
  @throws(classOf[GeneralException])
  def getParamValue[T](implicit ct: ClassTag[T], request: Request[AnyContent], key: String): T = {
    getParamValue[T]( ct,getParamJsObject(request),key)
  }

  /**
   * @tparam T : return type
   * @param params : throughput json params (removed the outer layer "data")
   **/
  @throws(classOf[GeneralException])
  def getParamValue[T](implicit ct: ClassTag[T], params: JsObject, key: String): T = {
    params.value.get(key) match {
      case None => throw new
          GeneralException(key, ResultCodeEnum.Request_Param_Missing.value())
      case Some(jsValue) =>
        try {
          getValue[T](ct,jsValue,throwException = true).get
        } catch {
          case e: JsResultException => throw new
              GeneralException(key, ResultCodeEnum.Request_Param_Wrong_Type.value())
        }

    }
  }

  @throws(classOf[GeneralException])
  def getParamJsObject(request: Request[AnyContent]): JsObject =
    request.body.asFormUrlEncoded match {
      case None => throw new
          GeneralException("FormUrlEncoded", ResultCodeEnum.Request_Wrong_Format.value())
      case Some(params) =>
        params.get("data") match {
          case None => throw new
              GeneralException("data", ResultCodeEnum.Request_Param_Missing.value())
          case Some(data) =>
            try
              Json.parse(data.mkString).as[JsObject]
            catch {
              case e@(_: JsonParseException | _: JsonMappingException | _: JsResultException) => throw new
                  GeneralException("data", ResultCodeEnum.Request_Wrong_Format.value())
              case e: IOException => throw new
                  GeneralException("retry", ResultCodeEnum.Network_Not_Stable.value())
            }
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
