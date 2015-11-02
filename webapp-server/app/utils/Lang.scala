package utils

import java.io.InvalidClassException
import java.security.MessageDigest

import play.api.Logger
import play.api.libs.json._

import scala.reflect.ClassTag

/**
 * Created by beenotung on 11/1/15.
 */
object Lang {
  val messageDigest = MessageDigest.getInstance("SHA-256")

  def repeat[A](func: => A) = new {
    def until(condition: A => Boolean): A = {
      var a = func
      while (!condition(a))
        a = func
      a
    }
  }

  @Deprecated
  @throws(classOf[InvalidClassException])
  @throws(classOf[JsResultException])
  def findJsValueClass[T](implicit ct: ClassTag[T]): Class[_ <: JsValue] = {
    val t = ct.runtimeClass
    if (t.equals(classOf[Boolean]))
      classOf[JsBoolean]
    else if (t.equals(classOf[Short])
      || t.equals(classOf[Int])
      || t.equals(classOf[Long])
      || t.equals(classOf[Float])
      || t.equals(classOf[Double])
      || t.equals(classOf[BigDecimal]))
      classOf[JsNumber]
    else if (t.equals(classOf[Seq[JsValue]]) || t.equals(classOf[List[JsValue]]) || t.equals(classOf[Set[JsValue]]))
      classOf[JsArray]
    else if (t.equals(classOf[String]))
      classOf[JsString]
    else if (t.equals(classOf[Map[String, JsValue]]))
      classOf[JsObject]
    else throw new
        InvalidClassException(t.getName, "not support by play.api.libs.json")
  }

  @throws(classOf[InvalidClassException])
  @throws(classOf[JsResultException])
  /*@throws(classOf[ClassCastException])*/
  def getValue[T](implicit ct: ClassTag[T], jsValue: JsValue, throwException: Boolean = false): Option[T] = {
    val t = ct.runtimeClass
    if (t.equals(classOf[Boolean]))
      Some(jsValue.as[JsBoolean].value.asInstanceOf[T])
    else if (t.equals(classOf[Short]))
      Some(jsValue.as[JsNumber].value.toShort.asInstanceOf[T])
    else if (t.equals(classOf[Int]))
      Some(jsValue.as[JsNumber].value.toInt.asInstanceOf[T])
    else if (t.equals(classOf[Float]))
      Some(jsValue.as[JsNumber].value.toFloat.asInstanceOf[T])
    else if (t.equals(classOf[Double]))
      Some(jsValue.as[JsNumber].value.toDouble.asInstanceOf[T])
    else if (t.equals(classOf[BigDecimal]))
      Some(jsValue.as[JsNumber].value.asInstanceOf[T])
    else if (t.equals(classOf[String]))
      Some(jsValue.as[JsString].value.asInstanceOf[T])
    /*else if (a.equals(classOf[Seq[JsValue]]))
      Some(jsValue.as[JsArray].value.asInstanceOf[A])
    else if (a.equals(classOf[Map[String, JsValue]]))
      Some(jsValue.as[JsObject].value.asInstanceOf[A])*/
    else
    if (throwException) {
      Logger.error(Map(
        "ct.runtimeClass" -> t.getName,
        "jsValue" -> jsValue.toString()
      ).mkString)
      throw new InvalidClassException(t.getName, "not support by play.api.libs.json")
    }
    else
      None
  }
}
