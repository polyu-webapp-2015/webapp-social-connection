package models.impl

import models.idl.social_connection.{ResultCodeEnum, GeneralException}

/**
 * Created by beenotung on 10/30/15.
 */
trait GeneralObject {
  def toMap: Map[String, Any]

  def fromMap(map: Map[String, Any]): GeneralObject = ???
}

object GeneralObject {
  @throws(classOf[GeneralException])
  def getParamValue[A](map: Map[String, Any], key: String): A = {
    map.get(key) match {
      case Some(value) =>
        value match {
          case v: A => v
          case _ => throw new GeneralException(key, ResultCodeEnum.Request_Param_Wrong_Type.value())
        }
      case None => throw new GeneralException(key, ResultCodeEnum.Request_Param_Missing.value())
    }
  }
}
