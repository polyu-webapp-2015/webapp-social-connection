-- MySQL Script generated by MySQL Workbench
-- Wednesday, December 09, 2015 PM05:47:25 HKT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema social_connection
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `social_connection` ;

-- -----------------------------------------------------
-- Schema social_connection
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `social_connection` DEFAULT CHARACTER SET utf8 ;
USE `social_connection` ;

-- -----------------------------------------------------
-- Table `social_connection`.`Account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Account` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Account` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(32) NOT NULL,
  `account_type` ENUM('admin', 'helper', 'attendee') NOT NULL,
  `email` VARCHAR(254) NULL,
  `phone_num` VARCHAR(31) NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `phone_UNIQUE` (`phone_num` ASC))
ENGINE = InnoDB
COMMENT = 'for login only';


-- -----------------------------------------------------
-- Table `social_connection`.`Floor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Floor` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Floor` (
  `floor_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`floor_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Venus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Venus` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Venus` (
  `venue_id` INT NOT NULL,
  `floor_id` INT NULL,
  PRIMARY KEY (`venue_id`),
  INDEX `fk_Venus_1_idx` (`floor_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Event` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Event` (
  `event_id` INT NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edit_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `event_type` ENUM('E', 'S') NOT NULL,
  `venue_id` INT NOT NULL,
  `event_time` DATETIME NOT NULL,
  `creator_account_id` INT NULL,
  `editor_account_id` INT NULL,
  `subject` VARCHAR(45) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`event_id`),
  INDEX `fk_Event_Account_create_idx` (`creator_account_id` ASC),
  INDEX `fk_Event_Account_edit_idx` (`editor_account_id` ASC),
  INDEX `index_Event_event_type` (`event_type` ASC),
  INDEX `fk_Event_1_idx` (`venue_id` ASC))
ENGINE = InnoDB
COMMENT = 'E \'exhibition\'\nS \'session\'';


-- -----------------------------------------------------
-- Table `social_connection`.`Exhibition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Exhibition` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Exhibition` (
  `event_id` INT(11) NOT NULL,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB
COMMENT = 'speed up filtering?';


-- -----------------------------------------------------
-- Table `social_connection`.`Event_Attendee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Event_Attendee` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Event_Attendee` (
  `event_id` INT(11) NOT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`event_id`, `account_id`),
  INDEX `attendee_id` (`account_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Friendship`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Friendship` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Friendship` (
  `friendship_id` INT(11) NOT NULL AUTO_INCREMENT,
  `host_id` INT(11) NOT NULL,
  `guest_id` INT(11) NOT NULL,
  `remark` TEXT NULL,
  PRIMARY KEY (`friendship_id`, `host_id`, `guest_id`),
  INDEX `host_id` (`host_id` ASC),
  INDEX `guest_id` (`guest_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Message` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Message` (
  `msg_id` INT(11) NOT NULL AUTO_INCREMENT,
  `from_account_id` INT(11) NOT NULL,
  `to_account_id` INT(11) NOT NULL,
  `create_time` DATETIME NOT NULL,
  `read_time` DATETIME NULL,
  PRIMARY KEY (`msg_id`),
  INDEX `from_id` (`from_account_id` ASC),
  INDEX `to_id` (`to_account_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Title`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Title` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Title` (
  `title_id` INT NOT NULL AUTO_INCREMENT,
  `title_text` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`title_id`),
  UNIQUE INDEX `title_text_UNIQUE` (`title_text` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Country` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Country` (
  `country_id` INT NOT NULL AUTO_INCREMENT,
  `country_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE INDEX `country_name_UNIQUE` (`country_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Organization`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Organization` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Organization` (
  `organization_id` INT NOT NULL,
  `organization_type` ENUM('business', 'academic') NOT NULL,
  `name` VARCHAR(45) NULL,
  `main_country` INT NOT NULL,
  PRIMARY KEY (`organization_id`),
  INDEX `fk_Organization_1_idx` (`main_country` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`City`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`City` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`City` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `country_id` INT NOT NULL,
  `city_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE INDEX `city_name_UNIQUE` (`city_name` ASC),
  INDEX `fk_City_1_idx` (`country_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`User` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`User` (
  `account_id` INT ZEROFILL NOT NULL,
  `sex` ENUM('F', 'M', 'other', 'unknown') NULL DEFAULT NULL,
  `first_name` CHAR(63) NULL DEFAULT NULL,
  `last_name` CHAR(63) NULL DEFAULT NULL,
  `organization_id` INT NULL DEFAULT NULL,
  `title_id` INT NULL DEFAULT NULL,
  `city_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  INDEX `fk_User_1_idx` (`title_id` ASC),
  INDEX `fk_User_1_idx1` (`organization_id` ASC),
  INDEX `fk_User_2_idx` (`city_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4;


-- -----------------------------------------------------
-- Table `social_connection`.`Event_Organization`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Event_Organization` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Event_Organization` (
  `event_id` INT NOT NULL,
  `organization_id` INT NOT NULL,
  PRIMARY KEY (`event_id`, `organization_id`),
  INDEX `fk_Event_Organization_2_idx` (`organization_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Tag` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Tag` (
  `tag_id` INT NOT NULL,
  `tag_content` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `tag_content_UNIQUE` (`tag_content` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`JsonArray`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`JsonArray` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`JsonArray` (
  `JsonArray_id` INT NOT NULL AUTO_INCREMENT,
  `JsonArray_content` TEXT NOT NULL,
  PRIMARY KEY (`JsonArray_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Friendship_Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Friendship_Tag` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Friendship_Tag` (
  `friendship_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`friendship_id`, `tag_id`),
  INDEX `fk_Friendship_Tag_2_idx` (`tag_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Session` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Session` (
  `event_id` INT NOT NULL,
  `quota` INT NOT NULL,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `social_connection`.`Announcement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `social_connection`.`Announcement` ;

CREATE TABLE IF NOT EXISTS `social_connection`.`Announcement` (
  `announcement_id` INT NOT NULL AUTO_INCREMENT,
  `subject` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`announcement_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `social_connection`.`Account`
-- -----------------------------------------------------
START TRANSACTION;
USE `social_connection`;
INSERT INTO `social_connection`.`Account` (`account_id`, `password`, `account_type`, `email`, `phone_num`) VALUES (1, 'pw', 'admin', 'admin@gmail.com', '98765432');

COMMIT;


-- -----------------------------------------------------
-- Data for table `social_connection`.`Title`
-- -----------------------------------------------------
START TRANSACTION;
USE `social_connection`;
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (1, 'Mr.');
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (2, 'Mrs.');
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (3, 'Miss.');
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (4, 'Dr.');
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (5, 'Ir.');
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (6, 'Sir');
INSERT INTO `social_connection`.`Title` (`title_id`, `title_text`) VALUES (7, 'Lady');

COMMIT;


-- -----------------------------------------------------
-- Data for table `social_connection`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `social_connection`;
INSERT INTO `social_connection`.`User` (`account_id`, `sex`, `first_name`, `last_name`, `organization_id`, `title_id`, `city_id`) VALUES (1, 'M', 'Beeno', 'Tung', NULL, NULL, NULL);

COMMIT;

