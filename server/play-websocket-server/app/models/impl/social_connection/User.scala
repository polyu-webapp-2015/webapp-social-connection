package models.impl.social_connection

import models.idl.social_connection.{ResultCodeEnum, GeneralException, User}
import models.idl.social_connection.UserPackage.UserGroupSeqHolder
import models.impl.GeneralObject
import models.impl.GeneralObject.getParamValue
import org.omg.CORBA.ShortHolder
import play.api.libs.openid.UserInfo

/**
 * Created by beenotung on 10/30/15.
 */
object User {
  implicit def newInstance(_userId: String, _userIntro: String): models.idl.social_connection.User = new User {
    override def userId(): String = _userId

    override def userIntro(): String = _userIntro

    override def getUserGroupList(userGroupSeq: UserGroupSeqHolder, numUserGroup: ShortHolder): Unit = ???

    override def toMap: Map[String, Any] = ???

    override def fromMap(map: Map[String, Any]) = User.fromMap(map)
  }

  @throws(classOf[GeneralException])
  def fromMap(map: Map[String, Any]): User = {
    val userId = getParamValue[String](map, "userId")
    val userInfo = getParamValue[String](map, "userInfo")
    newInstance(userId.asInstanceOf[String],userInfo)
  }
}
