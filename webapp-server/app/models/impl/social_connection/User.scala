package models.impl.social_connection

import models.database.DatabaseHelper
import models.idl.social_connection.UserPackage.UserGroupSeqHolder
import models.idl.social_connection.{SexEnum, User}
import models.impl.GeneralObject
import org.omg.CORBA.ShortHolder
import play.api.libs.json.{JsObject, JsString}

/**
 * Created by beenotung on 10/30/15.
 */
object User {
  implicit def newInstance( _jsObject: JsObject): models.idl.social_connection.User = new User {
    def getString(key: String) = GeneralObject.getString(jsObject, key)

    override def userId(): String = getString("userId")

    override def lastName(): String = getString("lastName")

    override def lastName(newLastName: String): Unit = DatabaseHelper.setUser(userId(), "lastName", JsString(newLastName))

    override def getUserGroupList(userGroupSeq: UserGroupSeqHolder, numUserGroup: ShortHolder): Unit = ???

    override def userIntro(): String = ???

    override def userIntro(newUserIntro: String): Unit = ???

    override def nickName(): String = ???

    override def nickName(newNickName: String): Unit = ???

    override def phoneNum(): String = ???

    override def phoneNum(newPhoneNum: String): Unit = ???

    override def email(): String = ???

    override def email(newEmail: String): Unit = ???

    override def sex(): SexEnum = ???

    override def sex(newSex: SexEnum): Unit = ???

    override def firstName(): String = ???

    override def firstName(newFirstName: String): Unit = ???

    override val jsObject: JsObject = _jsObject

    override def isPasswordCorrect(password: String): Boolean = password.equals(getString("password"))
  }

  /*@Deprecated
  @throws(classOf[GeneralException])
  def fromMap(map: Map[String, Any]): User = {
    val userId = getParamValue[String](map, "userId")
    val userInfo = getParamValue[String](map, "userInfo")
    newInstance(userId.asInstanceOf[String], userInfo)
  }*/
}
