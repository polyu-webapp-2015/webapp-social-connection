SELECT `User`.`account_id`,
    `User`.`sex`,
    `User`.`first_name`,
    `User`.`last_name`,
    `Organization`.`name` AS `organization_name`,
    /*`Title`.`title_text` AS `title`,*/
    `User`.`title_id`,
    `User`.`city_id`    
FROM `social_connection`.`User`
	INNER JOIN `social_connection`.`Organization`
	ON `User`.`organization_id`=`Organization`.`organization_id`
    
    INNER JOIN `Title`
    ON `User`.`title_id`=`Title`.`title_id`
WHERE `User`.`account_id` = :account_id;
