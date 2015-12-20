SELECT COUNT(*) AS result FROM Event_Attendee
WHERE Event_Attendee.event_id = :event_id
