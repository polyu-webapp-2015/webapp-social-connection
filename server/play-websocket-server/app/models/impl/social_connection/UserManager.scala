package models.impl.social_connection


import java.security.MessageDigest
import java.util.concurrent.ConcurrentHashMap

import models.DatabaseHelper
import models.idl.social_connection.{GeneralException, ResultCodeEnum, User, UserManager}
import play.api.libs.json.JsString

import scala.util.Random

/**
 * Created by beenotung on 10/31/15.
 */
object UserManager extends UserManager {
  def newUserId = {
    Random.nextInt()
  }

  override def createUser(email: String, phoneNum: String, password: String): Unit = ???

  /**
   * @param username : phoneNum or email
   * @param password : raw password from user
   **/
  @throws(classOf[GeneralException])
  override def newSessionId(username: String, password: String): String = {
    var user: User = null
    try {
      user = DatabaseHelper.findUser("phoneNum", JsString(username))
    } catch {
      case e: GeneralException =>
        if (e.resultCode.equals(ResultCodeEnum.User_Not_Exist.value())) {
          user = DatabaseHelper.findUser("email", JsString(username))
        }
        else throw e
    }
    val userId = user.userId()
    var sessionId = newSessionId(userId)
    sessionMap.synchronized {
      while (sessionMap containsKey sessionId)
        sessionId = newSessionId(userId)
      sessionMap put(sessionId, userId)
    }
    sessionId
  }

  /*return marshaled sessionId, without collision checking*/
  def newSessionId(userId: String): String =
    new String(messageDigest.digest(userId + System.currentTimeMillis() + System.nanoTime() getBytes()))

  val messageDigest = MessageDigest.getInstance("SHA-256")
  val sessionMap = new ConcurrentHashMap[String, String]()
}
