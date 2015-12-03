CREATE TABLE `Author` (
  `_id` int(11) NOT NULL auto_increment,
  `first_name` char(63) default NULL,
  `last_name` char(63) default NULL,
  `email` char(127) NOT NULL,
  `affiliation` char(255) default NULL,
  `title` char(7) default NULL,
  `city` char(63) default NULL,
  `country` char(63) default NULL,
  `dept` char(15) default NULL,
  PRIMARY KEY  (`_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `Exhibition` (
  `_id` int(11) NOT NULL auto_increment,
  `subject` char(255) NOT NULL,
  `content` text NOT NULL,
  `time` datetime default NULL,
  `venue` char(255) default NULL,
  `organization` char(255) default NULL,
  PRIMARY KEY  (`_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `ExhibitionAttendance` (
  `_id` int(11) NOT NULL auto_increment,
  `attendee_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`),
  KEY `attendee_id` (`attendee_id`),
  KEY `session_id` (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `Friendship` (
  `_id` int(11) NOT NULL auto_increment,
  `host_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`),
  KEY `host_id` (`host_id`),
  KEY `guest_id` (`guest_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `Message` (
  `_id` int(11) NOT NULL auto_increment,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY  (`_id`),
  KEY `from_id` (`from_id`),
  KEY `to_id` (`to_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `Paper` (
  `_id` int(11) NOT NULL auto_increment,
  `title` char(255) NOT NULL,
  `principal_author_id` int(11) NOT NULL,
  `file_name` char(15) default NULL,
  `topic_area` char(63) default NULL,
  `submission_time` datetime NOT NULL,
  PRIMARY KEY  (`_id`),
  UNIQUE KEY `file_name` (`file_name`),
  KEY `principal_author_id` (`principal_author_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `User` (
  `_id` int(11) NOT NULL auto_increment,
  `email` char(127) NOT NULL,
  `password` char(31) default NULL,
  `gender` char(1) default NULL,
  `first_name` char(63) default NULL,
  `last_name` char(63) default NULL,
  `affiliation` char(255) default NULL,
  `title` char(7) default NULL,
  `city` char(63) default NULL,
  `country` char(63) default NULL,
  PRIMARY KEY  (`_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
