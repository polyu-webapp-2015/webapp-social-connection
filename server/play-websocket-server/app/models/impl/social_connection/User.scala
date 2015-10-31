package models.impl.social_connection

import models.idl.social_connection.{SexEnum, ResultCodeEnum, GeneralException, User}
import models.idl.social_connection.UserPackage.UserGroupSeqHolder
import models.impl.GeneralObject
import models.impl.GeneralObject.getParamValue
import org.omg.CORBA.ShortHolder
import play.api.libs.openid.UserInfo

/**
 * Created by beenotung on 10/30/15.
 */
object User {
  implicit def newInstance(_userId: String,_lastName:String, _userIntro: String): models.idl.social_connection.User = new User {
    override def userId(): String = _userId

    override def lastName(): String =_lastName

    override def lastName(newLastName: String): Unit = ???

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

    override def toMap: Map[String, Any] = ???

    override def fromMap(map: Map[String, Any]): GeneralObject = ???
  }

  @throws(classOf[GeneralException])
  def fromMap(map: Map[String, Any]): User = {
    val userId = getParamValue[String](map, "userId")
    val userInfo = getParamValue[String](map, "userInfo")
    newInstance(userId.asInstanceOf[String],userInfo)
  }
}
