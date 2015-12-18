SELECT *
FROM Event INNER JOIN Venue
ON Event.venue_id = Venue.venue_id
INNER JOIN Floor
ON Venue.floor_id = Floor.floor_id