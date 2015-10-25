/**
 * Created by beenotung on 10/25/15.
 */
import scalaz._, Scalaz._
import argonaut._, Argonaut._

// data structure, json will be converted into this class
case class User(
                 dn: String,
                 cn: String,
                 givenName: String,
                 l: String,
                 mail: String,
                 displayName: String,
                 o: String)


object UserParser {

  // use the implicit json conversion of Argonaut
  // more information at http://argonaut.io/doc/parsing/
  implicit def UserCodecJson: CodecJson[User] =
  // the 9 represents the amount of arguments
    casecodec9(User.apply, User.unapply)("dn", "cn", "givenName","l", "mail", "uid", "displayName", "o", "plan")

  // method to use argonaut parse
  def parse(data: String) : Option[User] = {
    Parse.decodeOption[User](data)
  }

  // simple app to test JSON parsing
  def main(args: Array[String]) {

    // json input data
    var jsonString =
      """
        | {"dn":"uid=chris,ou=Users,dc=lollyrock,dc=com","controls":[],"cn":"Chris Rock","givenName":"Chris","l":"Berlin","mail":"chris@lollyrock.com","uid": "chris" ,"displayName":"ch.hartmann","o":"Rock Inc."}
      """.stripMargin

    // parse json content
    val userdata: Option[User] = parse(jsonString)

    // print specific values
    val usr = userdata.get
    println (usr.dn)
    println (usr.displayName)

  }

}
