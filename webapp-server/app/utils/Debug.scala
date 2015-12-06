package utils

import play.api.Logger

/**
  * Created by beenotung on 10/31/15.
  */
object Debug {
  lazy val Error = true
  lazy val Debug = true
  lazy val Info = true

  /*default verbose level*/
  lazy val DefaultVerbose = true

  /*Network related verbose level*/
  lazy val NetworkVerbose = true

  /*database verbose level*/
  lazy val DatabaseVerbose = true

  /*database updater thread verbose level*/
  lazy val DatabaseUpdaterVerbose = false

  def logInfo(message: => String) = if (DefaultVerbose && Info) Logger.info(message)

  def logDebug(message: => String) = if (DefaultVerbose && Debug) Logger.debug(message)

  def logError(message: => String) = if (DefaultVerbose && Error) Logger.error(message)

  def logNetworkInfo(message: => String) = if (NetworkVerbose && Info) Logger.info(message)

  def logNetworkDebug(message: => String) = if (NetworkVerbose && Debug) Logger.debug(message)

  def logNetworkError(message: => String) = if (NetworkVerbose && Error) Logger.error(message)

  def logDatabaseInfo(message: => String) = if (DatabaseVerbose && Info) Logger.info(message)

  def logDatabaseDebug(message: => String) = if (DatabaseVerbose && Debug) Logger.debug(message)

  def logDatabaseError(message: => String) = if (DatabaseVerbose && Error) Logger.error(message)

  def logDatabaseUpdaterInfo(message: => String) = if (DatabaseUpdaterVerbose && Info) Logger.info(message)

  def logDatabaseUpdaterDebug(message: => String) = if (DatabaseUpdaterVerbose && Debug) Logger.debug(message)

  def logDatabaseUpdaterError(message: => String) = if (DatabaseUpdaterVerbose && Error) Logger.error(message)
}
