package models.database

/**
  * Created by beenotung on 11/19/15.
  */
trait JsObject extends play.api.libs.json.JsObject with models.idl.database.JsObject
trait JsArray extends play.api.libs.json.JsArray with models.idl.database.JsArray
trait JsValue extends play.api.libs.json.JsValue with models.idl.database.JsValue
