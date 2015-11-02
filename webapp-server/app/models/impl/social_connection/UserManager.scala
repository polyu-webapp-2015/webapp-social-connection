package models.impl.social_connection


import java.util.concurrent.ConcurrentHashMap

import models.DatabaseHelper
import utils.Lang
import Lang.messageDigest
import models.idl.social_connection._
import play.api.libs.json.{JsNumber, JsString, JsValue}

import scala.util.Random

/**
 * Created by beenotung on 10/31/15.
 */
object UserManager extends UserManagerOperations {
  def newUserId = {
    Random.nextInt()
  }


  /**
   * @param emailOrPhoneNum : phoneNum or email
   * @param password : raw password from user
   **/
  @throws(classOf[GeneralException])
  override def newSessionId(emailOrPhoneNum: String, password: String): String = {
    val user = DatabaseHelper.findUserByEmailOrPhoneNum(emailOrPhoneNum, throwUserNotFoundException = true).get
    if (!user.isPasswordCorrect(password)) {
      throw new GeneralException(ResultCodeEnum.Password_Wrong.value())
    } else {
      val userId = user.userId()
      var sessionId = generateSessionId(userId)
      sessionMap.synchronized {
        while (sessionMap containsKey sessionId)
          sessionId = generateSessionId(userId)
        sessionMap put(sessionId, userId)
      }
      sessionId
    }
  }

  /*return marshaled sessionId, without collision checking*/
  private def generateSessionId(userId: String): String =
    new String(messageDigest.digest(userId + System.currentTimeMillis() + System.nanoTime() getBytes()))

  val sessionMap = new ConcurrentHashMap[String, String]()

  @throws(classOf[GeneralException])
  override def createUser(emailOrPhoneNum: String, password: String, sex: SexEnum): String = {
    val key: String = if (emailOrPhoneNum contains '@') "email" else "phoneNum"
    DatabaseHelper.findUserByEmailOrPhoneNum(emailOrPhoneNum) match {
      case None => /*new user*/
        DatabaseHelper.newUser(Map[String,JsValue](
          key -> JsString(emailOrPhoneNum),
          "password" -> JsString(password),
          "sex" -> JsNumber(sex.value())
        )).userId()
      case Some(user) => /*duplicated user*/
        throw new GeneralException(key, ResultCodeEnum.Duplicated.value())
    }
  }

  override def isEmailOrPhoneNumUnique(emailOrPhoneNum: String): Boolean =
    DatabaseHelper.findUserByEmailOrPhoneNum(emailOrPhoneNum).isEmpty
}
