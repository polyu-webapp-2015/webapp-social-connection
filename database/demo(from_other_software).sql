CREATE TABLE `evcategories` (
  `Category` varchar(50) NOT NULL,
  PRIMARY KEY (`Category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `evevents` (
  `Category` varchar(50) DEFAULT NULL,
  `Description` mediumtext,
  `EventID` int(11) NOT NULL AUTO_INCREMENT,
  `FromDate` date DEFAULT NULL,
  `FromTime` varchar(50) DEFAULT NULL,
  `Image` varchar(500) DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `Map` mediumtext,
  `Note` mediumtext,
  `Price` decimal(10,0) DEFAULT NULL,
  `Subject` varchar(250) DEFAULT NULL,
  `ToDate` date DEFAULT NULL,
  `ToTime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `evtellfriend` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EmailAddress1` varchar(50) DEFAULT NULL,
  `EmailAddress2` varchar(50) DEFAULT NULL,
  `EmailAddress3` varchar(50) DEFAULT NULL,
  `EmailAddress4` varchar(50) DEFAULT NULL,
  `EmailAddress5` varchar(50) DEFAULT NULL,
  `EmailBody` mediumtext,
  `EmailSubject` varchar(250) DEFAULT NULL,
  `FromName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `evusers` (
  `Email` varchar(50) DEFAULT NULL,
  `Group` varchar(50) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Password` varchar(50) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
