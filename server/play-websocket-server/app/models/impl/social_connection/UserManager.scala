package models.impl.social_connection

import models.idl.social_connection.UserManager
import models.impl.GeneralObject
import models.impl.GeneralObject.getParamValue

import scala.util.Random

/**
 * Created by beenotung on 10/31/15.
 */
object UserManager extends UserManager{
  def newUserId={
    Random.nextInt()
  }

  override def createUser(email: String, phoneNum: String, password: String): Unit = ???

  override def getSessionId(username: String, password: String): String = ???
}
