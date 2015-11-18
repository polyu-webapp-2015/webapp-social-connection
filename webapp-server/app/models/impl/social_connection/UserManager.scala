package models.impl.social_connection


import java.util.concurrent.ConcurrentHashMap
import models.database.DatabaseHelper
import models.idl.social_connection._
import play.api.libs.json.{JsNumber, JsString, JsValue}
import utils.Lang.digest

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
      throw new GeneralException(ResultCodeEnum.Password_Wrong.value(), "")
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
    digest(userId + System.currentTimeMillis() + System.nanoTime())

  val sessionMap = new ConcurrentHashMap[String, String]()

  /**
   * @return : userId
   * @throws GeneralException : internal error (e.g. database)
   * */
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
        throw new GeneralException(ResultCodeEnum.Duplicated.value(), key)
    }
  }

  override def isEmailOrPhoneNumUnique(emailOrPhoneNum: String): Boolean =
    DatabaseHelper.findUserByEmailOrPhoneNum(emailOrPhoneNum).isEmpty
}
