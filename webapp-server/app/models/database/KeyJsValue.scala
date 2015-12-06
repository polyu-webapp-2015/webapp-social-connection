package models.database

import models.idl.database.JsValue


/**
  * Created by beenotung on 11/19/15.
  */
class KeyJsValue(var _key: String, var _jsValue: JsValue) extends models.idl.database.KeyJsValueOperations{
  override def key(): String = _key

  override def key(newKey: String): Unit = _key = newKey

  override def jsValue(): JsValue = _jsValue

  override def jsValue(newJsValue: models.idl.database.JsValue): Unit = _jsValue = newJsValue
}
