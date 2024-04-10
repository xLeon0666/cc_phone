-- Exportiere Struktur von Tabelle hopev.phones
CREATE TABLE IF NOT EXISTS `phones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  PRIMARY KEY (`id`,`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=11408 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_business
CREATE TABLE IF NOT EXISTS `phone_business` (
  `job` varchar(255) NOT NULL,
  `motd` varchar(255) DEFAULT NULL,
  `hasapp` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`job`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_calls
CREATE TABLE IF NOT EXISTS `phone_calls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caller` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1095563 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_contacts
CREATE TABLE IF NOT EXISTS `phone_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `name` text NOT NULL,
  `number` int(11) NOT NULL,
  `favorite` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=102456 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_gallery
CREATE TABLE IF NOT EXISTS `phone_gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` text NOT NULL,
  `date` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25412 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_groups
CREATE TABLE IF NOT EXISTS `phone_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT 'Default Group',
  `members` longtext NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=466 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_group_members
CREATE TABLE IF NOT EXISTS `phone_group_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3426 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_group_messages
CREATE TABLE IF NOT EXISTS `phone_group_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(20) NOT NULL,
  `date` int(11) NOT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6514 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_informations
CREATE TABLE IF NOT EXISTS `phone_informations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `notes` longtext DEFAULT NULL,
  `avatarurl` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2070 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle hopev.phone_messages
CREATE TABLE IF NOT EXISTS `phone_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `index` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(20) NOT NULL,
  `date` int(11) NOT NULL,
  `identifier` int(11) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1165008 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Daten Export vom Benutzer nicht ausgewählt

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
