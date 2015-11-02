package utils

import play.api.Logger

/**
 * Created by beenotung on 10/31/15.
 */
object Debug {
  val Error = true
  val Debug = true
  val Info = true

  /*default verbose level*/
  val DefaultVerbose = true

  /*Network related verbose level*/
  val NetworkVerbose = true

  /*database verbose level*/
  val DatabaseVerbose = true

  def logInfo(message: => String) = if (DefaultVerbose && Info) Logger.info(message)


  def logDatabaseInfo(message: => String) = if (DatabaseVerbose && Info) Logger.info(message)

  def logNetworkInfo(message: => String) = if (NetworkVerbose && Info) Logger.info(message)

  def logDebug(message: => String) = if (DefaultVerbose && Debug) Logger.error(message)

  def logDatabaseDebug(message: => String) = if (DatabaseVerbose && Debug) Logger.error(message)

  def logNetworkDebug(message: => String) = if (NetworkVerbose && Debug) Logger.error(message)

  def logError(message: => String) = if (DefaultVerbose && Error) Logger.error(message)

  def logDatabaseError(message: => String) = if (DatabaseVerbose && Error) Logger.error(message)

  def logNetworkError(message: => String) = if (NetworkVerbose && Error) Logger.error(message)
}
