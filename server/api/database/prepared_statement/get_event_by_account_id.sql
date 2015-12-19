SELECT *
FROM Event
#   INNER JOIN Venue
#   ON Event.venue_id = Venue.venue_id

#   INNER JOIN Floor
#   ON Venue.floor_id = Floor.floor_id

WHERE Event.event_id IN (
  SELECT Event_Attendee.event_id
  FROM Event_Attendee
  WHERE Event_Attendee.account_id = :account_id
)