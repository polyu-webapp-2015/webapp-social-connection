import akka.actor.Actor

/**
 * Created by beenotung on 10/26/15.
 */
class GeoTrellisServiceActor extends GeotrellisService with Actor {
  def actorRefFactory = context

  def receive = runRoute(rootRoute)
}
