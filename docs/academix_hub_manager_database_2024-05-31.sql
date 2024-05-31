# ************************************************************
# Sequel Ace SQL dump
# Version 20062
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.5.5-10.4.28-MariaDB)
# Database: academix_hub_manager
# Generation Time: 2024-05-31 21:12:49 +0000
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
  `action` enum('search','insert','update','delete','login') NOT NULL,
  `table_name` enum('courses','lessons_schedule','school','status','students','teachers','users','users_categories') NOT NULL,
  `row_id` int(11) unsigned NOT NULL,
  `action_description` text NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `backlog` WRITE;
/*!40000 ALTER TABLE `backlog` DISABLE KEYS */;

INSERT INTO `backlog` (`id`, `action`, `table_name`, `row_id`, `action_description`, `user_email`, `created_at`, `updated_at`)
VALUES
	(1570,'login','users',147,'{\"id\":147,\"email\":\"master@master.com\",\"hashed_password\":\"$argon2id$v=19$m=65536,t=3,p=4$IZV1a1QqPqjjqG8woBcbhA$UFrIpk82zBFZKJZJznJlfGi6ZksD35ywKg9vuRNcetI\",\"category\":\"admin\",\"created_at\":\"2024-05-29T18:51:44.000Z\",\"updated_at\":\"2024-05-31T14:01:55.000Z\"}','master@master.com','2024-05-31 23:11:45','2024-05-31 23:11:45'),
	(1571,'search','teachers',4,'{\"id\":4,\"name\":\"Joelle\",\"surname\":\"Cummings\",\"birthdate\":\"1982-03-16T23:00:00.000Z\",\"email\":\"joelle@yahoo.com\",\"telef\":123456789,\"address\":\"129-7629 Risus. Rd.\",\"started_at\":\"2022-11-05T23:00:00.000Z\",\"status_id\":1,\"created_at\":\"2024-04-24T15:30:22.000Z\",\"updated_at\":\"2024-05-29T20:58:58.000Z\",\"status_name\":\"Active\"}','master@master.com','2024-05-31 23:12:09','2024-05-31 23:12:09'),
	(1572,'search','teachers',4,'{\"id\":4,\"name\":\"Joelle\",\"surname\":\"Cummings\",\"birthdate\":\"1982-03-16T23:00:00.000Z\",\"email\":\"joelle@yahoo.com\",\"telef\":123456789,\"address\":\"129-7629 Risus. Rd.\",\"started_at\":\"2022-11-05T23:00:00.000Z\",\"status_id\":1,\"created_at\":\"2024-04-24T15:30:22.000Z\",\"updated_at\":\"2024-05-29T20:58:58.000Z\",\"status_name\":\"Active\"}','master@master.com','2024-05-31 23:12:09','2024-05-31 23:12:09'),
	(1573,'search','courses',5,'{\"id\":5,\"name\":\"Full Stack Web Development\",\"edition_number\":12345,\"hours_duration\":720,\"begin_date\":\"2024-04-30T22:00:00.000Z\",\"end_date\":\"2025-05-30T22:00:00.000Z\",\"description\":null,\"teacher_id\":4,\"status_id\":1,\"created_at\":\"2024-04-24T12:42:33.000Z\",\"updated_at\":\"2024-04-25T19:32:19.000Z\",\"teacher_name\":\"Joelle Cummings\",\"teacher_email\":\"joelle@yahoo.com\",\"status_name\":\"Active\"}','master@master.com','2024-05-31 23:12:12','2024-05-31 23:12:12'),
	(1574,'search','courses',6,'{\"id\":6,\"name\":\"UI/UX\",\"edition_number\":10000,\"hours_duration\":120,\"begin_date\":\"2024-01-04T23:00:00.000Z\",\"end_date\":\"2024-03-04T23:00:00.000Z\",\"description\":null,\"teacher_id\":7,\"status_id\":4,\"created_at\":\"2024-04-24T16:30:28.000Z\",\"updated_at\":\"2024-04-25T19:32:19.000Z\",\"teacher_name\":\"Marvin O\'Donnell\",\"teacher_email\":\"marvin5925@google.couk\",\"status_name\":\"Suspended\"}','master@master.com','2024-05-31 23:12:15','2024-05-31 23:12:15'),
	(1575,'search','lessons_schedule',29,'{\"id\":29,\"date\":\"2024-07-02T22:00:00.000Z\",\"begin_time\":\"09:00:00\",\"end_time\":\"12:00:00\",\"description\":\"Lesson 4\",\"course_id\":5,\"status_id\":1,\"created_at\":\"2024-05-30T16:58:07.000Z\",\"updated_at\":\"2024-05-31T14:23:35.000Z\",\"course_name\":\"Full Stack Web Development\",\"status_name\":\"Active\"}','master@master.com','2024-05-31 23:12:19','2024-05-31 23:12:19'),
	(1576,'search','students',54,'{\"id\":54,\"name\":\"Aaron\",\"surname\":\"Wynn\",\"birthdate\":\"1995-07-10T22:00:00.000Z\",\"email\":\"proin@aol.edu\",\"telef\":123456789,\"address\":\"Ap #675-7214 Ut, Street\",\"enrolled_at\":\"2020-08-26T22:00:00.000Z\",\"course_id\":6,\"grade\":null,\"graduated_at\":null,\"status_id\":3,\"created_at\":\"2024-05-04T14:50:26.000Z\",\"updated_at\":\"2024-05-29T19:34:55.000Z\",\"course_name\":\"UI/UX\",\"status_name\":\"Pending\"}','master@master.com','2024-05-31 23:12:23','2024-05-31 23:12:23');

/*!40000 ALTER TABLE `backlog` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table courses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `courses`;

CREATE TABLE `courses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `edition_number` int(5) unsigned NOT NULL,
  `hours_duration` int(4) NOT NULL,
  `begin_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) unsigned NOT NULL,
  `status_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_name_edition_number` (`name`,`edition_number`),
  KEY `courses_teachers` (`teacher_id`),
  KEY `courses_statis` (`status_id`),
  CONSTRAINT `courses_statis` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `courses_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;

INSERT INTO `courses` (`id`, `name`, `edition_number`, `hours_duration`, `begin_date`, `end_date`, `description`, `teacher_id`, `status_id`, `created_at`, `updated_at`)
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
  `begin_time` time NOT NULL,
  `end_time` time NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `status_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_lesson_unique_period` (`date`,`begin_time`,`end_time`,`course_id`),
  KEY `lessons_schedule_courses` (`course_id`),
  KEY `lessons_schedule_status` (`status_id`),
  CONSTRAINT `lessons_schedule_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `lessons_schedule_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `lessons_schedule` WRITE;
/*!40000 ALTER TABLE `lessons_schedule` DISABLE KEYS */;

INSERT INTO `lessons_schedule` (`id`, `date`, `begin_time`, `end_time`, `description`, `course_id`, `status_id`, `created_at`, `updated_at`)
VALUES
	(18,'2024-05-02','09:00:00','12:00:00','Lesson 1',5,6,'2024-05-08 17:02:17','2024-05-31 16:20:14'),
	(22,'2024-05-03','14:00:00','17:00:00','Lesson 2',5,6,'2024-05-28 17:43:13','2024-05-31 16:29:19'),
	(24,'2024-05-06','09:00:00','12:00:00','Lesson 3',5,6,'2024-05-28 17:43:57','2024-05-31 16:29:31'),
	(25,'2024-05-07','14:00:00','17:00:00','Lesson 1',6,6,'2024-05-29 18:57:28','2024-05-31 16:29:05'),
	(27,'2024-05-08','09:00:00','12:00:00','Lesson 2',6,6,'2024-05-30 18:53:51','2024-05-31 16:28:55'),
	(29,'2024-07-03','09:00:00','12:00:00','Lesson 4',5,1,'2024-05-30 18:58:07','2024-05-31 16:23:35'),
	(30,'2024-07-03','09:00:00','12:00:00','Lesson 3',6,1,'2024-05-30 20:06:38','2024-05-31 16:23:39');

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
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `uc_name_abbreviation` (`name`,`abbreviation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Only school information, no relations';

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;

INSERT INTO `school` (`id`, `name`, `abbreviation`, `created_at`, `updated_at`)
VALUES
	(1,'Formation Tech Center','FTC','2024-04-24 13:19:47','2024-05-30 13:49:14');

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;

INSERT INTO `status` (`id`, `name`, `description`, `created_at`, `updated_at`)
VALUES
	(1,'Active','courses, students, teachers, lessons_schedule','2024-04-24 13:15:12','2024-05-17 18:15:56'),
	(2,'Inactive','students, teachers','2024-04-24 13:15:26','2024-05-17 18:15:59'),
	(3,'Pending','courses, students, teachers, lessons_schedule','2024-04-24 17:00:16','2024-05-17 18:16:03'),
	(4,'Suspended','students','2024-04-24 17:00:26','2024-05-17 18:16:06'),
	(5,'Cancelled','courses, students, lessons_schedule','2024-04-24 17:00:46','2024-05-17 18:16:11'),
	(6,'Terminated','courses, teachers, lessons_schedule','2024-04-24 17:01:09','2024-05-17 18:16:14'),
	(7,'Absent','students, teachers','2024-04-24 17:01:20','2024-05-17 18:16:18'),
	(8,'Graduated','students','2024-04-24 17:01:33','2024-05-17 18:16:22');

/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table students
# ------------------------------------------------------------

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `telef` int(20) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT 'to include street, number, zipcode and city',
  `enrolled_at` date NOT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `grade` int(2) DEFAULT NULL,
  `graduated_at` date DEFAULT NULL,
  `status_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_names_surnames` (`name`,`surname`),
  KEY `students_courses` (`course_id`),
  KEY `students_status` (`status_id`),
  CONSTRAINT `students_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `students_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`id`, `name`, `surname`, `birthdate`, `email`, `telef`, `address`, `enrolled_at`, `course_id`, `grade`, `graduated_at`, `status_id`, `created_at`, `updated_at`)
VALUES
	(14,'Dante','Macdonald','1994-05-31','dante5085@google.couk',123456789,'Ap #678-6378 Fusce Road','2024-03-02',6,NULL,NULL,1,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(15,'Nelle','Jarvis','2001-08-04','nelle6567@yahoo.edu',123456789,'549-7186 Lacinia Av.','2020-03-16',5,NULL,NULL,2,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(16,'Tatiana','Hicks','1980-09-16','tatiana@protonmail.net',123456789,'827-2818 Purus, Av.','2021-09-11',6,NULL,NULL,3,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(17,'Warren','Powers','1989-07-25','warren@outlook.net',123456789,'785-5269 Eget Street','2021-04-13',6,NULL,NULL,4,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(18,'Tanya','Hayden','1981-04-04','tanya1694@icloud.ca',123456789,'845-4693 Nulla Avenue','2022-05-14',6,NULL,NULL,5,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(19,'Alexandra','Rodriquez','2000-08-06','alexandra3588@icloud.ca',123456789,'194-1408 Velit. St.','2020-11-30',5,NULL,NULL,5,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(20,'Adrian','Holden','1980-02-12','adrian8156@aol.net',123456789,'P.O. Box 751, 213 Ante St.','2022-06-01',5,NULL,NULL,6,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(21,'Anjolie','Fuentes','1987-07-08','anjolie@yahoo.ca',123456789,'724-6666 In Street','2021-05-10',6,NULL,NULL,7,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(22,'Minerva','Sharpe','2002-06-17','minerva@aol.couk',123456789,'P.O. Box 437, 6114 Gravida Av.','2023-03-24',5,NULL,NULL,1,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(23,'Roth','Davenport','1984-02-22','roth@yahoo.edu',123456789,'Ap #967-2761 Varius Avenue','2022-03-16',5,NULL,NULL,2,'2024-04-24 18:35:11','2024-05-29 21:34:55'),
	(24,'Chaim','Nelson','1985-06-30','chaim8397@hotmail.com',123456789,'853-536 Ornare St.','2022-10-27',5,NULL,NULL,2,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(25,'Libby','Kent','1981-08-29','libby9186@icloud.org',123456789,'Ap #115-252 Elit. St.','2023-11-10',5,NULL,NULL,4,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(26,'Jesse','Edwards','2004-12-30','jesse@protonmail.edu',123456789,'P.O. Box 456, 1644 Odio Road','2023-03-05',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(27,'Tate','Hernandez','1986-05-17','tate8318@icloud.couk',123456789,'5457 Nulla Road','2020-08-09',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(28,'Sophia','Jimenez','1998-07-19','sophia@yahoo.org',123456789,'Ap #106-4815 Diam Avenue','2021-01-11',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(29,'Xaviera','Berger','1998-08-21','xaviera4269@google.edu',123456789,'243-4126 Eget Rd.','2023-10-29',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(30,'Grady','Bullock','1985-09-05','grady7383@yahoo.net',123456789,'Ap #434-5129 Nam St.','2023-02-15',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(31,'Cooper','Petersen','1985-09-04','cooper@outlook.ca',123456789,'Ap #951-1455 Lacus. St.','2022-07-02',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(32,'Amity','Park','1983-03-22','amity@hotmail.com',123456789,'840-1559 Fermentum Rd.','2025-04-16',5,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(33,'Silas','Travis','1997-02-16','silas7745@google.couk',123456789,'932-1035 Tincidunt. Road','2020-09-02',6,NULL,NULL,1,'2024-04-24 18:35:12','2024-05-29 21:34:55'),
	(34,'Jermaine','Parsons','1994-06-30','facilisis.vitae.orci@outlook.com',123456789,'Ap #825-7339 Varius. St.','2021-04-28',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(35,'Pamela','Mckee','1988-07-09','montes.nascetur@hotmail.com',123456789,'Ap #271-7704 Eu Ave','2024-11-18',6,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(36,'Kelsie','Reeves','1981-05-09','malesuada.fames@google.com',123456789,'Ap #336-9988 Lorem Street','2024-02-12',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(37,'Melodie','Mcintyre','1982-04-20','arcu@protonmail.ca',123456789,'Ap #114-3920 Vestibulum, Rd.','2022-12-14',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(38,'Gemma','Morse','1994-06-15','tortor.at@hotmail.ca',123456789,'8850 A Rd.','2024-11-13',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(39,'Maile','Waller','1997-11-21','proin.vel.arcu@outlook.ca',123456789,'Ap #106-1477 Non, Rd.','2020-01-08',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(40,'Kelly','Strickland','2000-04-11','sed@aol.couk',123456789,'584-1535 Nunc Avenue','2021-11-15',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(41,'Chanda','Gilmore','1982-04-21','nulla.facilisis.suspendisse@outlook.edu',123456789,'Ap #512-8251 Interdum Street','2020-12-29',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(42,'Paloma','Raymond','1983-12-03','dis.parturient@hotmail.ca',123456789,'P.O. Box 177, 1621 Ante St.','2022-12-15',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(43,'Aquila','Bray','2005-12-30','nec.quam@icloud.com',123456789,'564-2939 Netus Av.','2023-02-27',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(44,'Lisandra','Holman','1991-06-14','vestibulum.lorem@protonmail.couk',123456789,'P.O. Box 492, 2426 Eu, Road','2020-06-06',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(45,'Walter','Horne','2004-07-03','donec.est@google.net',123456789,'741-471 Arcu. Av.','2023-01-12',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(46,'Abbot','Trevino','1996-12-18','donec.tincidunt@icloud.net',123456789,'Ap #787-4821 Velit. Avenue','2021-07-26',5,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(47,'Irene','Leonard','1982-06-12','tempor.lorem@yahoo.edu',123456789,'933-4567 Metus. Road','2020-07-22',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(48,'Mona','Bryant','1980-08-17','dignissim.tempor@yahoo.com',123456789,'938-4470 Dictum Road','2020-08-21',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(49,'Oscar','Moore','1986-01-28','scelerisque.mollis.phasellus@outlook.com',123456789,'533-1772 Egestas. St.','2024-10-27',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(50,'Kay','Shepard','1984-03-09','dolor.donec@aol.couk',123456789,'484-1262 Nec Rd.','2021-04-07',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(51,'Briar','Padilla','2005-03-09','lacus.quisque@aol.org',123456789,'560-4174 Vivamus Av.','2022-07-16',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(52,'Jaquelyn','Black','1987-02-14','vestibulum.ante@protonmail.net',123456789,'476-9586 Nunc Rd.','2022-08-22',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(53,'Gretchen','Stephens','1989-05-10','elementum.dui.quis@protonmail.net',123456789,'Ap #276-9631 Dolor Road','2020-05-09',6,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(54,'Aaron','Wynn','1995-07-11','proin@aol.edu',123456789,'Ap #675-7214 Ut, Street','2020-08-27',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(55,'Gloria','Williams','1992-01-12','nisl@outlook.com',123456789,'Ap #392-3993 Dolor Road','2024-06-01',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(56,'Rhona','Schroeder','1994-05-10','neque.et.nunc@aol.org',123456789,'1982 A, Rd.','2020-06-07',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(57,'Rina','Craig','2002-09-19','nec.tellus@protonmail.couk',123456789,'Ap #929-6296 Tellus Av.','2023-07-27',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(58,'Arsenio','Ayers','1995-08-14','mi@protonmail.edu',123456789,'495-2596 Penatibus Rd.','2023-12-18',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(59,'Daryl','Mckinney','1998-07-16','velit.sed.malesuada@icloud.edu',123456789,'184-6009 Massa. Av.','2020-02-07',5,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(60,'Ferdinand','Bryant','1991-10-22','non.cursus@yahoo.com',123456789,'801-1767 Pede. Street','2020-09-11',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(61,'Cassady','Reeves','1996-04-13','eu.ligula.aenean@yahoo.couk',123456789,'932-9825 Scelerisque, Avenue','2024-10-26',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(62,'Karleigh','Woodard','1987-05-05','tincidunt.tempus.risus@google.com',123456789,'328-2940 Sed Street','2024-06-08',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(63,'Yvonne','Mooney','2000-02-09','ultricies.sem@icloud.ca',123456789,'Ap #276-459 Facilisis, Ave','2023-05-23',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(64,'Eve','Bruce','2001-11-01','enim@icloud.ca',123456789,'6713 Aliquet Road','2023-12-11',6,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(65,'Coby','Parrish','1980-03-06','eget@hotmail.com',123456789,'Ap #805-5432 Ipsum. Avenue','2020-07-29',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(66,'Kelly','Adams','2002-04-28','eu@yahoo.net',123456789,'Ap #851-2545 Sem Av.','2024-01-25',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(67,'Rebecca','Ewing','1995-05-25','vitae.dolor.donec@google.net',123456789,'521-8916 Tellus Road','2024-02-23',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(68,'Ima','Pope','1983-11-20','ut.nisi@google.edu',123456789,'P.O. Box 814, 4430 In Rd.','2022-11-16',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(69,'Shea','Stone','2003-08-01','eu.lacus.quisque@aol.net',123456789,'Ap #925-8667 Luctus St.','2021-06-20',5,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(70,'Quynn','Kane','1991-07-04','vitae.erat@yahoo.ca',123456789,'Ap #269-8499 Eget Rd.','2024-09-20',6,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(71,'Rahim','Casey','1980-02-03','tortor.at@yahoo.couk',123456789,'P.O. Box 457, 180 Neque Avenue','2023-10-19',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(72,'Lois','Morrow','2004-05-02','suspendisse.tristique@google.ca',123456789,'2534 Curabitur St.','2021-04-28',6,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(73,'Jeanette','Hutchinson','2001-11-14','risus.nunc@protonmail.com',123456789,'572-1090 Justo. Street','2021-11-02',6,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(74,'Brennan','Blackwell','1992-01-04','dui.fusce@hotmail.ca',123456789,'987-8491 Sed Road','2024-04-11',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(75,'Keely','Hunter','2001-05-22','integer.eu@outlook.net',123456789,'P.O. Box 412, 6965 Neque Avenue','2021-10-18',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(76,'Courtney','Mathews','2000-05-23','sapien@aol.org',123456789,'700-9045 Augue St.','2020-03-02',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(77,'Keiko','Dale','1990-04-24','vel.est@hotmail.ca',123456789,'751 Justo Rd.','2021-08-24',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(78,'Aaron','Hammond','1992-09-06','praesent.eu@google.edu',22222,'886-6960 Donec Ave','2024-02-10',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-31 16:15:28'),
	(79,'Britanney','Pearson','2005-08-18','etiam.gravida.molestie@outlook.ca',123456789,'6119 Aliquam St.','2020-08-09',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(80,'Yuli','Carpenter','1987-08-26','vulputate@google.couk',123456789,'Ap #769-1988 Fringilla Street','2023-02-23',5,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(81,'Knox','Herring','1980-03-08','nisl.elementum@aol.edu',123456789,'Ap #224-4751 Leo. Rd.','2020-01-13',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(82,'Eugenia','Gregory','1983-03-11','mauris.a@google.couk',123456789,'843-8205 Sodales Rd.','2022-01-12',5,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(83,'Hakeem','Becker','1981-09-30','massa.non@icloud.couk',123456789,'Ap #974-9014 Justo St.','2024-03-04',6,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(84,'Walter','Frederick','2003-01-26','tristique.neque.venenatis@protonmail.com',123456789,'148-4589 Odio. Av.','2020-10-22',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(85,'Ifeoma','Avery','1984-11-30','eu@google.org',123456789,'P.O. Box 174, 1536 Mattis Street','2021-02-16',5,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(86,'Helen','Hutchinson','1983-02-03','purus.gravida@outlook.com',123456789,'589-607 Semper. Rd.','2024-07-20',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(87,'Zephania','Webb','1980-05-31','quisque@aol.com',123456789,'Ap #528-2921 Enim Rd.','2020-01-10',6,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(88,'Rana','Garner','1995-08-05','volutpat.nulla.facilisis@yahoo.net',123456789,'P.O. Box 599, 5227 Malesuada Ave','2022-03-14',6,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(89,'Lee','Rich','1985-09-30','leo@aol.edu',123456789,'Ap #680-7991 Auctor Street','2020-04-29',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(90,'Yetta','Mcguire','1982-12-15','egestas.nunc@outlook.net',123456789,'P.O. Box 304, 6989 Et St.','2023-06-09',5,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(91,'Aidan','Whitaker','1991-02-10','luctus.ut@outlook.couk',123456789,'956-9590 Aenean St.','2023-05-03',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(92,'Phelan','Shelton','1998-11-05','nec.eleifend.non@icloud.couk',123456789,'Ap #546-8310 Donec Rd.','2021-05-21',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(93,'Hiram','Cummings','1993-04-25','vestibulum.nec.euismod@aol.net',123456789,'Ap #395-3825 Cursus. Av.','2020-10-10',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(94,'Gretchen','Bruce','1995-01-17','tempor.est@aol.net',123456789,'5590 A Avenue','2020-12-20',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(95,'Hanae','Brennan','1984-09-27','cursus.a@protonmail.couk',123456789,'713-2199 Sed Avenue','2023-11-27',5,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(96,'Abra','Kim','1995-04-26','semper@outlook.ca',123456789,'7316 Lobortis Street','2023-12-04',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(97,'Cole','Noel','1991-03-28','sed.auctor@protonmail.ca',123456789,'Ap #953-6557 Eget St.','2020-12-07',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(98,'Erasmus','Riley','1980-05-30','dui.in@protonmail.net',123456789,'982-2835 Tristique Rd.','2020-07-24',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(99,'Channing','Mann','1998-09-23','leo.elementum.sem@yahoo.com',123456789,'P.O. Box 792, 7639 Non, Street','2023-08-24',5,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(100,'Quentin','Montgomery','1986-04-17','varius@google.ca',123456789,'Ap #528-7057 Semper Avenue','2021-12-30',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(101,'Leroy','Daugherty','1984-02-13','blandit.nam.nulla@outlook.net',123456789,'P.O. Box 778, 3629 Sem Avenue','2023-07-01',6,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(102,'Keane','Humphrey','1995-10-15','ut.ipsum@hotmail.net',123456789,'Ap #454-8134 Lorem Street','2021-11-21',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(103,'Illiana','Prince','1980-05-29','mi@yahoo.ca',123456789,'153-5378 Nunc Avenue','2020-07-22',5,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(104,'Randall','Cummings','2000-04-23','dui.semper.et@outlook.org',123456789,'Ap #768-4176 Facilisis St.','2024-07-29',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(105,'Patience','Hawkins','1998-10-12','purus.in@aol.org',123456789,'Ap #469-7515 Nulla Rd.','2023-12-09',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(106,'Murphy','Gross','1995-01-06','varius.ultrices@icloud.couk',123456789,'225-4906 Metus Avenue','2020-04-07',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(107,'Lacota','Ratliff','2004-06-28','nisi@aol.edu',123456789,'558-9837 Aenean St.','2024-06-06',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(108,'Moses','Chambers','1996-01-05','accumsan.interdum@aol.com',123456789,'887-6502 Purus Rd.','2022-10-05',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(109,'Irma','Lindsey','1982-08-13','nullam.feugiat@google.org',123456789,'Ap #423-8396 Ut Avenue','2023-03-15',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(110,'Yeo','Levine','2001-11-12','nulla.ante@yahoo.com',123456789,'753-8620 Lobortis Rd.','2020-10-17',5,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(111,'Hoyt','Pennington','1992-11-12','dignissim@protonmail.com',123456789,'148-8508 Amet Rd.','2021-05-19',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(112,'Kerry','Coleman','1995-03-14','justo.eu@google.ca',123456789,'773-866 Vitae St.','2024-12-19',6,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(113,'Stuart','Fields','1984-04-17','vivamus.nibh.dolor@protonmail.org',123456789,'Ap #886-3860 Cursus Street','2021-09-30',5,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(114,'Bruce','Solis','1982-01-17','dui@outlook.org',123456789,'Ap #974-9734 Nec, Road','2021-07-14',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(115,'Marah','Watkins','2000-04-23','auctor.vitae@google.couk',123456789,'299-898 Eu, Avenue','2021-12-09',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(116,'Gray','Webster','1989-11-29','aliquet.sem@yahoo.edu',123456789,'724-1610 Purus Ave','2023-07-23',6,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(117,'Victor','Thomas','2004-07-23','augue.eu@hotmail.com',123456789,'Ap #587-5485 Quis Rd.','2024-02-26',6,NULL,NULL,1,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(118,'Illana','Sosa','2002-04-21','quis@hotmail.com',123456789,'Ap #602-6597 Tincidunt Ave','2023-06-27',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(119,'Brennan','Leblanc','1987-01-05','semper.nam.tempor@yahoo.net',123456789,'823-9262 Egestas St.','2023-11-02',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(120,'Jescie','Ramirez','1995-05-29','cras.pellentesque.sed@outlook.net',123456789,'Ap #891-2279 Sociosqu Rd.','2024-02-12',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(121,'Madeson','Marks','2000-04-28','aliquet@protonmail.couk',123456789,'P.O. Box 506, 8565 Natoque Ave','2021-11-13',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(122,'Erin','Cervantes','1987-03-23','justo.praesent@outlook.edu',123456789,'Ap #522-402 Odio Av.','2023-06-06',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(123,'Reed','Thomas','1995-06-23','lorem@hotmail.ca',123456789,'5544 Senectus Road','2023-12-05',5,NULL,NULL,8,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(124,'Gregory','Workman','1996-12-22','amet@hotmail.edu',123456789,'607-454 Et, Rd.','2023-12-17',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(125,'Colton','Mitchell','1981-09-13','enim.curabitur@protonmail.edu',123456789,'9556 Dictum Avenue','2022-06-15',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(126,'Daniel','Lewis','1987-10-22','fringilla@protonmail.ca',123456789,'Ap #205-1497 Non, St.','2022-07-21',6,NULL,NULL,5,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(127,'Hyatt','Barton','2003-06-12','ante.ipsum@icloud.org',123456789,'Ap #427-4847 Egestas, Rd.','2021-07-12',5,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(128,'Daryl','Blankenship','2002-08-29','aliquam.rutrum@yahoo.edu',123456789,'406-1397 Phasellus Avenue','2023-05-15',5,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(129,'Cody','Hoffman','1986-07-09','ut.nulla@protonmail.edu',123456789,'Ap #716-2886 Convallis, Rd.','2021-01-05',6,NULL,NULL,7,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(130,'Alexa','Mcclure','1985-01-16','egestas.sed@outlook.org',123456789,'5667 Sed St.','2022-12-23',5,NULL,NULL,4,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(131,'Leo','Haynes','1996-06-03','libero.mauris@hotmail.couk',123456789,'7924 Ridiculus St.','2020-03-07',6,NULL,NULL,3,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(132,'Daria','Kirk','1995-02-04','dictum@aol.net',123456789,'881-7421 Orci St.','2023-05-01',6,NULL,NULL,6,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(133,'Eric','Alvarado','1992-02-11','nullam.vitae@outlook.edu',123456789,'Ap #421-5469 Eu St.','2021-01-16',5,NULL,NULL,2,'2024-05-04 16:50:26','2024-05-29 21:34:55'),
	(134,'Ethan','Bryan','1984-01-02','aliquam.auctor.velit@hotmail.org',123456789,'5901 Donec Rd.','2022-08-25',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(135,'Virginia','Woodard','2001-04-01','et.ultrices@hotmail.com',123456789,'5846 Ut Road','2021-12-23',5,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(136,'Felix','Woodward','1984-12-16','tristique.neque@protonmail.com',123456789,'2768 Phasellus St.','2021-04-25',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(137,'Alma','Johns','1989-08-17','diam@hotmail.com',123456789,'Ap #381-9943 Nibh. Road','2024-02-27',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(138,'Carol','Bowers','1982-03-07','tincidunt.aliquam@yahoo.org',123456789,'907-4052 Nibh Av.','2021-07-04',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(139,'Clayton','Tyler','1999-05-07','posuere.vulputate@protonmail.net',123456789,'Ap #568-9077 Magnis Ave','2021-11-05',6,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(140,'Ali','Cooke','1984-03-19','lacus.ut@google.net',123456789,'213-8358 Non Road','2022-10-12',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(141,'Curran','Reid','1988-04-22','diam.nunc@hotmail.edu',123456789,'P.O. Box 549, 1118 Turpis Ave','2023-03-03',5,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(142,'Ahmed','Christian','1980-02-04','ipsum.primis.in@protonmail.com',123456789,'378-6741 Pretium Av.','2021-02-24',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(143,'Lillith','Hardy','1989-10-02','faucibus.ut@hotmail.couk',123456789,'3128 Ipsum. St.','2022-07-23',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(144,'Damian','Donovan','1983-03-05','diam.luctus@aol.net',123456789,'Ap #589-6405 Et, Ave','2022-12-13',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(145,'Slade','Gray','1984-01-26','maecenas.ornare@yahoo.com',123456789,'Ap #888-7608 A, Ave','2022-10-29',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(146,'Yvonne','Hewitt','1986-12-24','lectus.cum.sociis@google.org',123456789,'8703 Vitae Street','2022-01-07',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(147,'Abra','Guerrero','1989-03-05','nibh.aliquam.ornare@yahoo.net',123456789,'1152 Neque Rd.','2023-10-23',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(148,'Channing','Flores','1983-08-22','pretium.aliquet.metus@hotmail.ca',123456789,'Ap #227-7286 Aliquet St.','2021-11-07',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(149,'Wesley','Orr','1992-10-09','ut.semper@hotmail.net',123456789,'185-1701 Ut St.','2023-08-16',6,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(150,'Angelica','Mcdowell','1989-11-23','ornare.lectus.justo@icloud.org',123456789,'2656 Sed St.','2021-07-17',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(151,'Quamar','Moore','1998-06-09','pretium.et.rutrum@outlook.edu',123456789,'Ap #995-4399 Non, Road','2024-01-06',5,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(152,'Giacomo','Brady','2004-12-04','interdum.feugiat.sed@icloud.com',123456789,'Ap #336-3704 Leo. Rd.','2023-03-17',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(153,'Piper','Dixon','1997-05-09','eget@google.org',123456789,'Ap #548-296 Dolor Road','2020-12-03',5,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(154,'Francis','Mercado','1992-07-27','etiam.ligula@outlook.edu',123456789,'Ap #485-4290 Eu, Street','2023-05-31',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(155,'Brody','Flynn','1997-01-17','augue@yahoo.org',123456789,'Ap #781-4299 Mauris Road','2024-09-18',5,NULL,NULL,8,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(156,'Upton','Hudson','1990-07-15','facilisis.non@yahoo.net',123456789,'198-5710 Faucibus Rd.','2023-04-28',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(157,'Merrill','Rivera','1986-08-17','vestibulum.neque.sed@hotmail.com',123456789,'387-3104 Morbi Street','2022-04-28',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(158,'Gary','Gordon','1987-04-23','venenatis@google.org',123456789,'Ap #443-5936 Augue St.','2021-01-08',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(159,'Rebekah','Russell','2004-08-04','eu.tellus@hotmail.edu',123456789,'Ap #959-8626 Dui Road','2021-12-31',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(160,'Jamalia','Holcomb','2004-03-05','elit@hotmail.ca',123456789,'858-3673 Id, Ave','2021-08-15',6,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(161,'Lucian','Powell','1988-06-11','cum.sociis@outlook.net',123456789,'168-9943 Sapien. Street','2020-04-02',6,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(162,'Tarik','Freeman','1987-07-05','dolor@protonmail.ca',123456789,'132-2614 Elit, St.','2020-07-22',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(163,'Benjamin','Olsen','1983-02-26','lacus.etiam@hotmail.edu',123456789,'P.O. Box 440, 6147 Dignissim. Avenue','2021-05-30',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(164,'Ori','Porter','1985-05-08','neque@aol.edu',123456789,'699-6895 Vulputate Rd.','2024-11-24',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(165,'Linda','Emerson','2001-10-30','nisi.aenean@aol.com',123456789,'Ap #577-9863 Eu Rd.','2020-04-15',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(166,'Yael','Cameron','1997-09-23','molestie.tortor@outlook.ca',123456789,'149-8306 In Street','2020-10-17',5,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(167,'Cameran','Mcdonald','2001-12-05','facilisis.eget.ipsum@icloud.org',123456789,'Ap #228-3039 Egestas. Rd.','2021-06-19',6,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(168,'Channing','Hunt','2005-10-12','sagittis@outlook.net',123456789,'Ap #968-5932 Facilisi. Ave','2020-10-30',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(169,'Dieter','Fulton','1982-04-17','erat@outlook.ca',123456789,'197-5325 Ipsum Rd.','2020-08-17',6,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(170,'Hermione','Curtis','1982-12-13','maecenas.mi@icloud.ca',123456789,'8063 Rutrum Street','2021-10-28',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(171,'Adara','Roberson','1982-06-03','rutrum@hotmail.edu',123456789,'Ap #718-9651 Cras Rd.','2021-01-01',5,NULL,NULL,8,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(172,'Tara','Macdonald','2003-11-07','tristique.senectus.et@yahoo.ca',123456789,'1099 Id, St.','2021-03-08',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(173,'Fritz','Miranda','1993-10-15','a.odio@outlook.couk',123456789,'Ap #113-7198 Suspendisse Rd.','2022-03-04',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(174,'Graiden','Bonner','2003-05-28','arcu.vestibulum@protonmail.couk',123456789,'5890 Malesuada Rd.','2020-03-18',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(175,'Dustin','Hunt','1991-05-26','enim.nisl@icloud.com',123456789,'Ap #512-8076 Proin St.','2021-04-05',6,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(176,'John','Terry','2005-02-08','nunc.pulvinar@google.net',123456789,'8777 Metus Av.','2021-04-22',6,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(177,'Mechelle','Eaton','2002-04-03','ultrices.a@protonmail.org',123456789,'Ap #774-3420 Vel Road','2022-01-17',6,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(178,'Winter','Mejia','1997-07-13','eget.varius@yahoo.couk',123456789,'6333 Orci. Ave','2020-08-13',6,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(179,'Anne','Morris','1993-11-14','nulla@hotmail.net',123456789,'Ap #251-6844 Molestie Av.','2024-03-10',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(180,'Chelsea','Benton','2001-01-19','odio.etiam@yahoo.net',123456789,'Ap #597-3839 At, Road','2023-05-18',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(181,'Barrett','Paul','1994-06-30','a.auctor@google.net',123456789,'Ap #597-224 Cras St.','2022-05-09',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(182,'Craig','Kemp','1999-11-02','dui.fusce@aol.com',123456789,'P.O. Box 819, 4342 Elit Avenue','2021-10-22',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(183,'Magee','Parrish','1999-03-20','nonummy.ut@protonmail.org',123456789,'Ap #107-8812 Sem, St.','2022-07-11',6,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(184,'Jerry','Booker','1982-02-25','cubilia@hotmail.net',123456789,'3330 Lobortis. Street','2024-10-29',6,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(185,'Hedda','Hatfield','1997-12-13','neque.sed@icloud.org',123456789,'4843 Id, St.','2024-10-17',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(186,'Angela','Tanner','1994-10-17','ut.pharetra@hotmail.ca',123456789,'P.O. Box 781, 5806 Sed St.','2023-03-18',5,NULL,NULL,8,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(187,'Beau','Patterson','2000-01-23','lobortis@icloud.org',123456789,'Ap #492-1403 Proin Avenue','2021-03-18',6,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(188,'Dalton','Rivers','1989-09-28','porttitor.tellus@google.edu',123456789,'Ap #307-4919 Vulputate St.','2022-06-20',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(189,'Mary','Calhoun','1985-05-14','elit@aol.ca',123456789,'Ap #215-2931 Pellentesque Street','2022-01-31',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(190,'Tallulah','Rivera','1981-02-28','curabitur@icloud.net',123456789,'Ap #148-5533 Nascetur Avenue','2024-12-19',5,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(191,'Blossom','Carney','2003-09-05','nascetur@hotmail.edu',123456789,'436-1577 Cursus Rd.','2024-06-03',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(192,'Damon','Allen','1998-06-13','aliquam.vulputate@google.net',123456789,'496-4675 Lorem Avenue','2020-02-19',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(193,'Maggy','Hicks','1984-11-26','eu@aol.org',123456789,'152-6232 Lectus Street','2024-12-15',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(194,'Clinton','Pittman','1980-05-20','sapien@hotmail.couk',123456789,'Ap #869-2878 Penatibus Rd.','2022-09-29',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(195,'Blake','Lynn','1980-05-15','et@outlook.org',123456789,'Ap #997-4450 Nisi. St.','2021-08-30',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(196,'Hashim','Espinoza','1997-11-09','tempus@protonmail.ca',123456789,'P.O. Box 365, 2247 Facilisis Rd.','2023-12-31',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(197,'Upton','Middleton','1994-02-16','lacinia.mattis@icloud.ca',123456789,'Ap #618-2413 Vulputate Av.','2023-09-09',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(198,'Gregory','Fowler','2003-08-22','nulla.dignissim.maecenas@google.com',123456789,'842-7318 Ac Ave','2024-03-03',5,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(199,'Isadora','Rasmussen','1990-08-13','fusce@hotmail.ca',123456789,'P.O. Box 314, 7715 Auctor Street','2021-08-31',5,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(200,'Emma','Holland','1990-07-30','eget.mollis@icloud.com',123456789,'P.O. Box 216, 7382 Aliquam Av.','2021-05-27',6,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(201,'Rama','Mullins','1999-03-22','dolor.sit.amet@aol.com',123456789,'P.O. Box 563, 4011 Libero. Rd.','2024-12-18',5,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(202,'Lars','Morton','2004-02-02','quam.dignissim.pharetra@hotmail.org',123456789,'P.O. Box 634, 4349 Id Rd.','2022-10-21',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(203,'Alea','Kim','1987-07-16','purus@outlook.couk',123456789,'289-2058 Dictum Rd.','2024-10-03',6,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(204,'Hillary','Middleton','2004-06-13','mauris.nulla.integer@aol.edu',123456789,'259-6899 Dapibus Rd.','2023-11-07',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(205,'Emma','Mcbride','1980-10-18','libero.integer.in@icloud.couk',123456789,'8740 Placerat, Road','2022-08-12',5,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(206,'Kiara','Slater','1993-09-18','ligula.consectetuer.rhoncus@aol.com',123456789,'995-9392 Cum Av.','2024-09-24',5,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(207,'Theodore','Snow','1993-07-28','erat.in.consectetuer@aol.org',123456789,'P.O. Box 821, 4152 Tempus Street','2022-03-22',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(208,'Kyra','Wells','2005-02-11','orci.quis@outlook.org',123456789,'1576 Aliquet Road','2021-02-10',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(209,'Finn','Kane','1987-05-01','ultrices.duis@outlook.com',123456789,'546-8369 Congue St.','2021-06-22',5,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(210,'Selma','Mayo','2005-01-12','fermentum.arcu@protonmail.couk',123456789,'Ap #196-2890 Sed Ave','2024-10-28',6,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(211,'Gareth','Macdonald','1987-12-20','sit.amet.nulla@outlook.edu',123456789,'888-4041 Nulla. Street','2020-10-29',6,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(212,'Avram','Winters','1992-08-02','nibh.sit@protonmail.net',123456789,'Ap #925-5449 Nam Ave','2022-06-07',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(213,'Colorado','Duffy','1996-07-27','nunc@protonmail.com',123456789,'P.O. Box 285, 8617 Scelerisque Street','2021-02-13',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(214,'Gwendolyn','Stephens','1989-02-11','habitant@outlook.ca',123456789,'Ap #959-9152 Venenatis Road','2024-05-14',5,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(215,'Chaim','Bowers','1986-10-09','odio.sagittis.semper@protonmail.com',123456789,'Ap #686-2967 Ante, Rd.','2022-02-01',6,NULL,NULL,3,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(216,'Anthony','Conway','1999-12-28','lectus@hotmail.ca',123456789,'Ap #622-8382 Lectus Road','2023-10-14',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(217,'Clark','Green','2001-12-02','lacinia.sed@google.couk',123456789,'P.O. Box 512, 6769 A, Road','2020-08-11',5,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(218,'Kareem','Hutchinson','1997-05-14','erat.semper@google.net',123456789,'365-7343 Quis Road','2024-07-07',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(219,'Veronica','Downs','1999-11-17','posuere.at.velit@yahoo.com',123456789,'P.O. Box 857, 7658 Orci. St.','2023-02-05',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(220,'Quinlan','Knight','1997-06-08','elit.curabitur.sed@icloud.edu',123456789,'Ap #931-5449 Fusce Ave','2020-03-03',6,NULL,NULL,2,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(221,'Blake','Cash','1996-12-20','elit@hotmail.org',123456789,'P.O. Box 277, 8293 Risus, Street','2021-10-07',5,NULL,NULL,8,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(222,'Libby','Fleming','1991-10-11','sit.amet@hotmail.couk',123456789,'P.O. Box 975, 6803 Aliquet. Avenue','2023-08-14',5,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(223,'Edan','Lowe','1998-02-04','dictum.proin.eget@yahoo.ca',123456789,'803-2562 Augue Street','2020-10-06',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(224,'Laith','O\'donnell','1998-03-02','proin.velit@hotmail.net',123456789,'613-9081 Orci Ave','2021-08-24',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(225,'Cleo','Puckett','1989-09-10','sem@yahoo.ca',123456789,'906-6396 Cras Rd.','2020-12-13',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(226,'Adrian','Buckner','1981-03-22','nunc.sed@hotmail.net',123456789,'2087 Fringilla, Avenue','2022-04-05',6,NULL,NULL,1,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(227,'Gloria','Pugh','1980-07-24','vel.convallis@google.org',123456789,'406-4955 Dolor Street','2023-06-22',6,NULL,NULL,6,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(228,'Daria','Klein','1986-04-05','interdum@protonmail.couk',123456789,'P.O. Box 649, 4641 Mauris, Avenue','2021-01-22',5,NULL,NULL,7,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(229,'Kiona','Phillips','1998-11-11','libero.dui@google.net',123456789,'Ap #910-9780 Cursus Road','2022-08-13',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(230,'Eve','Dyer','1989-07-12','turpis.nulla.aliquet@hotmail.org',123456789,'Ap #769-7504 Et, St.','2024-12-02',6,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(231,'Christopher','Haley','1984-07-26','vitae.purus@icloud.ca',123456789,'P.O. Box 546, 3998 In, Ave','2024-06-15',6,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(232,'Harriet','Mayo','2004-07-19','sapien.cras@aol.net',123456789,'P.O. Box 394, 527 Nec, Road','2020-10-06',6,NULL,NULL,4,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(233,'Nehru','Berger','1981-02-19','lacinia.sed.congue@hotmail.edu',123456789,'Ap #907-6815 Consectetuer Rd.','2021-10-08',5,NULL,NULL,5,'2024-05-04 16:52:06','2024-05-29 21:34:55'),
	(237,'student','test','2008-05-30','student@student.com',123456789,'student test street','2024-01-01',5,NULL,NULL,1,'2024-05-30 15:52:24','2024-05-30 15:52:24');

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teachers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teachers`;

CREATE TABLE `teachers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `telef` int(20) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT 'to include street, number, zipcode and city',
  `started_at` date NOT NULL,
  `status_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc` (`name`,`surname`),
  KEY `teachers_status` (`status_id`),
  CONSTRAINT `teachers_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;

INSERT INTO `teachers` (`id`, `name`, `surname`, `birthdate`, `email`, `telef`, `address`, `started_at`, `status_id`, `created_at`, `updated_at`)
VALUES
	(4,'Joelle','Cummings','1982-03-17','joelle@yahoo.com',123456789,'129-7629 Risus. Rd.','2022-11-06',1,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(5,'Salvador','Solomon','1996-08-10','salvador@google.ca',123456789,'477-5056 Dui, Street','2020-08-02',2,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(6,'Kasimir','Blanchard','1985-08-01','kasimir8251@google.net',123456789,'5024 Convallis, Av.','2022-09-09',3,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(7,'Marvin','O\'Donnell','1992-02-10','marvin5925@google.couk',123456789,'P.O. Box 581, 2241 Dolor Avenue','2021-05-09',1,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(8,'Aline','Nash','1959-02-22','aline@hotmail.net',123456789,'946-1014 Integer St.','2024-12-07',4,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(9,'Cedric','Castillo','1984-05-11','cedric@hotmail.edu',123456789,'Ap #579-6849 Augue Rd.','2021-10-22',5,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(10,'Mollie','Solomon','1983-01-16','mollie1637@yahoo.edu',123456789,'Ap #112-5221 Ornare, St.','2023-02-09',1,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(11,'Axel','Calhoun','1956-05-08','axel7779@protonmail.net',123456789,'6317 Parturient Rd.','2021-12-11',1,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(12,'Murphy','Summers','1976-05-09','murphy4965@yahoo.com',123456789,'7682 Metus Avenue','2021-03-25',1,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(13,'Virginia','David','1979-07-08','virginia4571@protonmail.ca',123456789,'244-1110 Rutrum Road','2021-01-21',1,'2024-04-24 17:30:22','2024-05-29 22:58:58'),
	(29,'teacher','test','2006-05-30','teacher@teacher.com',123456789,'teacher test street','2024-01-01',1,'2024-05-30 15:51:14','2024-05-30 15:51:14');

/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `category` enum('admin','student','teacher') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `hashed_password`, `category`, `created_at`, `updated_at`)
VALUES
	(69,'student@student.com','$argon2id$v=19$m=65536,t=3,p=4$wSNN94RM6PB2Xcl3RS14qQ$rhzKQcseQpnZgIgd+YqJeloLfJyirHlr3qgy323LxPg','student','2024-05-09 19:16:40','2024-05-19 13:53:31'),
	(70,'teacher@teacher.com','$argon2id$v=19$m=65536,t=3,p=4$G9/0xkMHFsutSCP3KdoUGQ$esoTIxiakym98qeCmlxz9eciE1P2RWoHj7r144ecggo','teacher','2024-05-09 19:16:51','2024-05-29 16:16:03'),
	(147,'master@master.com','$argon2id$v=19$m=65536,t=3,p=4$IZV1a1QqPqjjqG8woBcbhA$UFrIpk82zBFZKJZJznJlfGi6ZksD35ywKg9vuRNcetI','admin','2024-05-29 20:51:44','2024-05-31 16:01:55'),
	(148,'admin@admin.com','$argon2id$v=19$m=65536,t=3,p=4$BrTLABN3+JybXhmNqLUZ1w$85DbyQEgFy2VDPW4gxHMvB82KW2dKAOYu+DgVbpVwYA','admin','2024-05-30 15:55:48','2024-05-30 15:55:48');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
