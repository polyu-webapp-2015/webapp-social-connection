package utils

import play.api.Logger

/**
 * Created by beenotung on 10/31/15.
 */
object Debug {
  /*default verbose level*/
  val verbose = false

  /*Network related verbose level*/
  val NetworkVerbose = true

  /*database verbose level*/
  val DatabaseVerbose = false

  def logInfo(message: => String) = if (verbose) Logger.info(message)

  def logDatabase(message: => String) = if (DatabaseVerbose) Logger.info(message)

  def logNetwork(message: => String) = if (NetworkVerbose) Logger.info(message)
}
