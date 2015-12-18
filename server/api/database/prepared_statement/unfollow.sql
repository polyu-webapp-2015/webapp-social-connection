UPDATE `social_connection`.`Follow`
SET
`deleted` = true
WHERE
  `follower_account_id` = :follower_account_id
AND
  `followed_account_id` = :followed_account_id;
