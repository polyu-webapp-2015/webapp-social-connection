package utils

import java.security.MessageDigest

/**
 * Created by beenotung on 11/1/15.
 */
object Utils {
  val messageDigest = MessageDigest.getInstance("SHA-256")

  def repeat[A](func: => A) = new {
    def until(condition: A => Boolean): A = {
      var a = func
      while (!condition(a))
        a = func
      a
    }
  }
}
