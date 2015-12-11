/* get new announcement that user has not read before */
SELECT *
FROM `social_connection`.`Announcement`
WHERE `Announcement`.`create_time` > (
	SELECT `last_announcement_datetime`    
	FROM `social_connection`.`User`
	WHERE `User`.`account_id` = :account_id
);