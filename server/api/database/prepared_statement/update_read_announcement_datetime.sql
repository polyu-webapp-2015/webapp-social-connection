/* update the user record after reading new announcement */
UPDATE `social_connection`.`User`
SET
`User`.`last_announcement_datetime` = (	
    /* get latest datetime of new announcement or old value if no new announcement */
	SELECT ifnull(
		max(`create_time`),
		(
			SELECT `last_announcement_datetime`    
			FROM (SELECT * FROM `social_connection`.`User`) AS `_User`
			WHERE `_User`.`account_id` = :account_id
		)
	) AS `date`
	FROM `social_connection`.`Announcement`
	WHERE `Announcement`.`create_time` > (
		SELECT `last_announcement_datetime`    
		FROM (SELECT * FROM `social_connection`.`User`) AS `_User`
		WHERE `_User`.`account_id` = :account_id
	)		    
)
WHERE `User`.`account_id` = :account_id;