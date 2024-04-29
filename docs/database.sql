# ************************************************************
# Sequel Ace SQL dump
# Version 20062
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.5.5-10.4.28-MariaDB)
# Database: academix_hub_manager
# Generation Time: 2024-04-28 13:54:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table backlog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `backlog`;

CREATE TABLE `backlog` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_name` enum('courses','lessons_schedule','school','status','students','teachers','users','users_categories') NOT NULL,
  `row_id` int(11) unsigned NOT NULL,
  `full_description` varchar(255) NOT NULL,
  `old_data` varchar(255) NOT NULL,
  `new_data` varchar(255) NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id_backlog` (`user_id`),
  CONSTRAINT `user_id_backlog` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `backlog` WRITE;
/*!40000 ALTER TABLE `backlog` DISABLE KEYS */;

INSERT INTO `backlog` (`id`, `table_name`, `row_id`, `full_description`, `old_data`, `new_data`, `user_id`, `created_at`, `updated_at`)
VALUES
	(1,'school',1,'TEST','TEST','TEST',1,'2024-04-25 22:06:21','2024-04-25 22:06:21');

/*!40000 ALTER TABLE `backlog` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table courses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `courses`;

CREATE TABLE `courses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `edition_number` int(11) NOT NULL,
  `hours_duration` int(11) NOT NULL,
  `begin` date NOT NULL,
  `end` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) unsigned NOT NULL,
  `status_id` int(2) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `courses_teachers` (`teacher_id`),
  KEY `courses_statis` (`status_id`),
  CONSTRAINT `courses_statis` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `courses_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;

INSERT INTO `courses` (`id`, `name`, `edition_number`, `hours_duration`, `begin`, `end`, `description`, `teacher_id`, `status_id`, `created_at`, `updated_at`)
VALUES
	(5,'Full Stack Web Development',12345,720,'2024-05-01','2025-05-31',NULL,4,1,'2024-04-24 14:42:33','2024-04-25 21:32:19'),
	(6,'UI/UX',10000,120,'2024-01-05','2024-03-05',NULL,7,4,'2024-04-24 18:30:28','2024-04-25 21:32:19');

/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table lessons_schedule
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lessons_schedule`;

CREATE TABLE `lessons_schedule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `begin` time NOT NULL,
  `end` time NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `status_id` int(2) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `lessons_schedule_courses` (`course_id`),
  KEY `lessons_schedule_status` (`status_id`),
  CONSTRAINT `lessons_schedule_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `lessons_schedule_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `lessons_schedule` WRITE;
/*!40000 ALTER TABLE `lessons_schedule` DISABLE KEYS */;

INSERT INTO `lessons_schedule` (`id`, `date`, `begin`, `end`, `description`, `course_id`, `status_id`, `created_at`, `updated_at`)
VALUES
	(8,'2024-05-01','09:00:00','12:00:00','Presentation',5,1,'2024-04-24 14:45:43','2024-04-25 21:33:30');

/*!40000 ALTER TABLE `lessons_schedule` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school`;

CREATE TABLE `school` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `abbreviation` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `abbreviation` (`abbreviation`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Only school information, no relations';

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;

INSERT INTO `school` (`id`, `name`, `abbreviation`, `created_at`, `updated_at`)
VALUES
	(1,'Fake Center Tech Hub','FCTH','2024-04-24 13:19:47','2024-04-24 13:19:47');

/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;

INSERT INTO `status` (`id`, `name`, `description`, `created_at`, `updated_at`)
VALUES
	(1,'active','courses, students, teachers, lessons_schedule','2024-04-24 13:15:12','2024-04-25 21:08:24'),
	(2,'inactive','students, teachers','2024-04-24 13:15:26','2024-04-25 21:03:31'),
	(3,'pending','courses, students, teachers, lessons_schedule','2024-04-24 17:00:16','2024-04-25 21:08:34'),
	(4,'suspended','students','2024-04-24 17:00:26','2024-04-25 21:00:33'),
	(5,'cancelled','courses, students, lessons_schedule','2024-04-24 17:00:46','2024-04-25 21:08:48'),
	(6,'terminated','courses, teachers, lessons_schedule','2024-04-24 17:01:09','2024-04-25 21:09:06'),
	(7,'absent','students, teachers','2024-04-24 17:01:20','2024-04-25 21:02:19'),
	(8,'graduated','students','2024-04-24 17:01:33','2024-04-25 21:02:25');

/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table students
# ------------------------------------------------------------

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `names` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `telef` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT 'to include street, number, zipcode and city',
  `enrolled_at` date NOT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `grade` int(11) DEFAULT NULL,
  `graduated_at` date DEFAULT NULL,
  `status_id` int(2) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `students_courses` (`course_id`),
  KEY `students_status` (`status_id`),
  CONSTRAINT `students_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `students_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`id`, `names`, `surnames`, `birthdate`, `email`, `telef`, `address`, `enrolled_at`, `course_id`, `grade`, `graduated_at`, `status_id`, `created_at`, `updated_at`)
VALUES
	(14,'Dante','Macdonald','1994-05-31','dante5085@google.couk','733-3841','Ap #678-6378 Fusce Road','2024-03-02',6,NULL,NULL,1,'2024-04-24 18:35:11','2024-04-25 21:39:19'),
	(15,'Nelle','Jarvis','2001-08-04','nelle6567@yahoo.edu','1-588-691-4126','549-7186 Lacinia Av.','2020-03-16',5,NULL,NULL,2,'2024-04-24 18:35:11','2024-04-25 21:39:19'),
	(16,'Tatiana','Hicks','1980-09-16','tatiana@protonmail.net','1-803-122-0183','827-2818 Purus, Av.','2021-09-11',6,NULL,NULL,3,'2024-04-24 18:35:11','2024-04-25 21:39:23'),
	(17,'Warren','Powers','1989-07-25','warren@outlook.net','216-4328','785-5269 Eget Street','2021-04-13',6,NULL,NULL,4,'2024-04-24 18:35:11','2024-04-25 21:39:23'),
	(18,'Tanya','Hayden','1981-04-04','tanya1694@icloud.ca','745-5699','845-4693 Nulla Avenue','2022-05-14',6,NULL,NULL,5,'2024-04-24 18:35:11','2024-04-25 21:39:28'),
	(19,'Alexandra','Rodriquez','2000-08-06','alexandra3588@icloud.ca','967-4857','194-1408 Velit. St.','2020-11-30',5,NULL,NULL,5,'2024-04-24 18:35:11','2024-04-25 21:39:33'),
	(20,'Adrian','Holden','1980-02-12','adrian8156@aol.net','1-388-134-2370','P.O. Box 751, 213 Ante St.','2022-06-01',5,NULL,NULL,6,'2024-04-24 18:35:11','2024-04-25 21:39:33'),
	(21,'Anjolie','Fuentes','1987-07-08','anjolie@yahoo.ca','1-834-265-4853','724-6666 In Street','2021-05-10',6,NULL,NULL,7,'2024-04-24 18:35:11','2024-04-25 21:39:38'),
	(22,'Minerva','Sharpe','2002-06-17','minerva@aol.couk','388-8806','P.O. Box 437, 6114 Gravida Av.','2023-03-24',5,NULL,NULL,1,'2024-04-24 18:35:11','2024-04-25 21:39:38'),
	(23,'Roth','Davenport','1984-02-22','roth@yahoo.edu','1-532-701-1614','Ap #967-2761 Varius Avenue','2022-03-16',5,NULL,NULL,2,'2024-04-24 18:35:11','2024-04-25 21:39:41'),
	(24,'Chaim','Nelson','1985-06-30','chaim8397@hotmail.com','832-2169','853-536 Ornare St.','2022-10-27',5,NULL,NULL,2,'2024-04-24 18:35:12','2024-04-25 21:39:41'),
	(25,'Libby','Kent','1981-08-29','libby9186@icloud.org','465-7752','Ap #115-252 Elit. St.','2023-11-10',5,NULL,NULL,4,'2024-04-24 18:35:12','2024-04-25 21:39:44'),
	(26,'Jesse','Edwards','2004-12-30','jesse@protonmail.edu','1-455-727-4432','P.O. Box 456, 1644 Odio Road','2023-03-05',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:44'),
	(27,'Tate','Hernandez','1986-05-17','tate8318@icloud.couk','104-2346','5457 Nulla Road','2020-08-09',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:48'),
	(28,'Sophia','Jimenez','1998-07-19','sophia@yahoo.org','739-3388','Ap #106-4815 Diam Avenue','2021-01-11',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:48'),
	(29,'Xaviera','Berger','1998-08-21','xaviera4269@google.edu','683-2218','243-4126 Eget Rd.','2023-10-29',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:51'),
	(30,'Grady','Bullock','1985-09-05','grady7383@yahoo.net','1-277-511-3180','Ap #434-5129 Nam St.','2023-02-15',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:51'),
	(31,'Cooper','Petersen','1985-09-04','cooper@outlook.ca','820-9466','Ap #951-1455 Lacus. St.','2022-07-02',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:54'),
	(32,'Amity','Park','1983-03-22','amity@hotmail.com','1-165-745-6745','840-1559 Fermentum Rd.','2025-04-16',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:54'),
	(33,'Silas','Travis','1997-02-16','silas7745@google.couk','462-5622','932-1035 Tincidunt. Road','2020-09-02',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-04-25 21:39:58');

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teachers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teachers`;

CREATE TABLE `teachers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `names` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `telef` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT 'to include street, number, zipcode and city',
  `started_at` date NOT NULL,
  `status_id` int(2) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `teachers_status` (`status_id`),
  CONSTRAINT `teachers_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;

INSERT INTO `teachers` (`id`, `names`, `surnames`, `birthdate`, `email`, `telef`, `address`, `started_at`, `status_id`, `created_at`, `updated_at`)
VALUES
	(4,'Joelle','Cummings','1982-03-17','joelle@yahoo.com','1-892-827-4039','129-7629 Risus. Rd.','2022-11-06',1,'2024-04-24 17:30:22','2024-04-25 21:41:35'),
	(5,'Salvador','Solomon','1996-08-10','salvador@google.ca','204-1852','477-5056 Dui, Street','2020-08-02',2,'2024-04-24 17:30:22','2024-04-25 21:41:38'),
	(6,'Kasimir','Blanchard','1985-08-01','kasimir8251@google.net','1-242-663-3083','5024 Convallis, Av.','2022-09-09',3,'2024-04-24 17:30:22','2024-04-25 21:41:38'),
	(7,'Marvin','O\'Donnell','1992-02-10','marvin5925@google.couk','954-4581','P.O. Box 581, 2241 Dolor Avenue','2021-05-09',1,'2024-04-24 17:30:22','2024-04-25 21:41:35'),
	(8,'Aline','Nash','1959-02-22','aline@hotmail.net','1-580-777-6426','946-1014 Integer St.','2024-12-07',4,'2024-04-24 17:30:22','2024-04-25 21:41:43'),
	(9,'Cedric','Castillo','1984-05-11','cedric@hotmail.edu','1-336-281-9153','Ap #579-6849 Augue Rd.','2021-10-22',5,'2024-04-24 17:30:22','2024-04-25 21:41:43'),
	(10,'Mollie','Solomon','1983-01-16','mollie1637@yahoo.edu','1-638-720-1679','Ap #112-5221 Ornare, St.','2023-02-09',1,'2024-04-24 17:30:22','2024-04-25 21:41:46'),
	(11,'Axel','Calhoun','1956-05-08','axel7779@protonmail.net','1-659-856-1813','6317 Parturient Rd.','2021-12-11',1,'2024-04-24 17:30:22','2024-04-25 21:41:46'),
	(12,'Murphy','Summers','1976-05-09','murphy4965@yahoo.com','1-128-472-1018','7682 Metus Avenue','2021-03-25',1,'2024-04-24 17:30:22','2024-04-25 21:41:49'),
	(13,'Virginia','David','1979-07-08','virginia4571@protonmail.ca','463-4285','244-1110 Rutrum Road','2021-01-21',1,'2024-04-24 17:30:22','2024-04-25 21:41:49');

/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `user_category_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `users_categories` (`user_category_id`),
  CONSTRAINT `users_categories` FOREIGN KEY (`user_category_id`) REFERENCES `users_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `hashed_password`, `user_category_id`, `created_at`, `updated_at`)
VALUES
	(1,'admin@admin.com','admin12345',1,'2024-04-24 14:47:15','2024-04-24 14:47:15');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_categories`;

CREATE TABLE `users_categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'admin, student, teacher',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;

INSERT INTO `users_categories` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(1,'admin','2024-04-24 14:46:14','2024-04-24 14:46:26'),
	(2,'student','2024-04-24 14:46:37','2024-04-24 14:46:37'),
	(3,'teacher','2024-04-24 14:46:46','2024-04-24 14:46:46');

/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
