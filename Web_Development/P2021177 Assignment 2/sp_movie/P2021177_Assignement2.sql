CREATE DATABASE  IF NOT EXISTS `sp_movie` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_movie`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_movie
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genreid` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`genreid`),
  UNIQUE KEY `genre_UNIQUE` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Action','the action genre has close ties to classic strife and struggle narratives that you find across all manner of art and literature','2021-06-19 06:05:28'),(2,'Scifi','This is Scifi','2021-06-19 06:07:00'),(3,'Comedy','This is very funny!','2021-07-05 06:28:14'),(4,'Drama','It is going to be long','2021-07-05 06:29:06'),(5,'Horror','Scared?','2021-07-05 06:29:26'),(6,'Thriller','Are you ready to investigate with us?','2021-07-05 06:35:10'),(7,'Animation','Figure Manipulation','2021-07-28 09:29:59'),(8,'Adventure','Exciting Experience','2021-07-28 09:30:22'),(9,'Romance','Love!','2021-07-28 09:31:30'),(10,'Crime','Crime Scene Under Control','2021-07-28 09:31:59'),(11,'Disaster','Nature','2021-07-28 09:32:23'),(12,'Fantasy','Does not exist','2021-07-28 09:33:17');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_movieid_image_idx` (`movie_id`),
  CONSTRAINT `fk_movieid_image` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,1,'/images/1.jpg','2021-07-22 15:45:13'),(2,2,'/images/2.jpg','2021-07-22 15:45:57'),(3,3,'/images/3.jpg','2021-07-22 15:46:24'),(4,4,'/images/4.jpg','2021-07-22 15:47:04'),(5,5,'/images/5.jpg','2021-07-22 15:47:20'),(6,6,'/images/6.jpg','2021-07-28 09:35:02'),(7,7,'/images/7.jpg','2021-07-28 10:19:10'),(8,8,'/images/8.jpg','2021-07-28 10:21:36'),(9,9,'/images/9.jpg','2021-07-28 10:24:00'),(10,10,'/images/10.jpg','2021-07-28 10:25:37');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movieid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `cast` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `opening_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`movieid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Godzilla vs. Kong','Legends collide as Godzilla and Kong, the two most powerful forces of nature, clash on the big screen in a spectacular battle for the ages. As a squadron embarks on a perilous mission into fantastic uncharted terrain, unearthing clues to the Titans\' very origins and mankind\'s survival, a conspiracy threatens to wipe the creatures, both good and bad, from the face of the earth forever.','Shun Oguri, Rebecca Hall, Kyle Chandler, Millie Bobby Brown, Brian Tyree Henry, Alexander Skarsgard , Eiza González, Julian Dennison, Demián Bichir','113 mins','24 Mar 2021','2021-07-02 07:40:38'),(2,'Fast and Furious 9','Vin Diesel’s Dom Toretto is leading a quiet life off the grid with Letty and his son, little Brian, but they know that danger always lurks just over their peaceful horizon. This time, that threat will force Dom to confront the sins of his past if he’s going to save those he loves most. His crew joins together to stop a world-shattering plot led by the most skilled assassin and high-performance driver they’ve ever encountered: a man who also happens to be Dom’s forsaken brother, Jakob (John Cena, next year’s The Suicide Squad).','Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Chris “Ludacris” Bridges, John Cena, Jordana Brewster, Nathalie Emmanuel, Sung Kang, with Helen Mirren and Charlize Theron','143 mins','1 Jul 2021','2021-07-05 06:37:19'),(3,'Never Stop','Never Stop, a comedy sports drama, tells the story of a young 100-metre-running athlete who encountered career obstacles and sought guidance from his former teammate and idol, but only to find out that his idol had backslid. Slowly but surely, the two work together to get away from their past and into the bright future.\n','Zheng Kai, Li Yunrui, Cao Bingkun, Zhang Lanxin, Sandrinne Pinna','98 mins','17 Jun 2021','2021-07-05 06:44:08'),(4,'A Quiet Place Part II','Following the deadly events at home, the Abbott family (Emily Blunt, Millicent Simmonds, Noah Jupe) must now face the terrors of the outside world as they continue their fight for survival in silence. Forced to venture into the unknown, they quickly realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path.','Emily Blunt, Cillian Murphy, Millicent Simmonds, Noah Jupe, Djimon Hounsou','97 mins','17 Jun 2021','2021-07-05 06:46:41'),(5,'The Conjuring: The Devil Made Me Do It','A chilling story of terror, murder and unknown evil that shocked even experienced real-life paranormal investigators Ed and Lorraine Warren. One of the most sensational cases from their files, it starts with a fight for the soul of a young boy, then takes them beyond anything they\'d ever seen before, to mark the first time in U.S. history that a murder suspect would claim demonic possession as a defense.','Vera Farmiga, Patrick Wilson, Julian Hilliard','112 mins','11 Jun 2021','2021-07-05 06:48:00'),(6,'Space Jam: A New Legacy','Welcome to the Jam! NBA champion and global icon LeBron James goes on an epic adventure alongside timeless Tune Bugs Bunny with the animated/live-action event \"Space Jam: A New Legacy,\" from director Malcolm D. Lee and an innovative filmmaking team including Ryan Coogler and Maverick Carter. This transformational journey is a manic mashup of two worlds that reveals just how far some parents will go to connect with their kids. When LeBron and his young son Dom are trapped in a digital space by a rogue A.I., LeBron must get them home safe by leading Bugs, Lola Bunny and the whole gang of notoriously undisciplined Looney Tunes to victory over the A.I.\'s digitized champions on the court: a powered-up roster of professional basketball stars as you\'ve never seen them before. It\'s Tunes versus Goons in the highest-stakes challenge of his life, that will redefine LeBron\'s bond with his son and shine a light on the power of being yourself.','LeBron James, Don Cheadle, Benjamin Flores Jr., Zendaya','116 mins','15 Jul 2021','2021-07-28 09:35:02'),(7,'The Ice Road','After a remote diamond mine collapses in far northern Canada, a ‘big-rig’ ice road driver Mike McCann (LIAM NEESON) must lead an impossible rescue mission over a frozen ocean to save the trapped miners before their oxygen runs out. Contending with thawing waters and a massive storm, they discover the real threat is one they never saw coming. Ice road veteran Mike McCann, along with his younger brother Gurty (MARCUS THOMAS), a gifted mechanic though impacted by aphasia from a war injury, join a hastily assembled team of skilled ice road drivers (LAURENCE FISHBURNE and AMBER MIDTHUNDER) who embark on a dangerous rescue mission. Mike and the team are forced to conquer stalled engines, cracking ice, violent pressure waves, deadly explosions, entire big rig trucks falling into the dark frozen waters, white-outs, an avalanche, and the death of their operation leader, all of which culminates in an epic showdown between Mike and the assassin, who seeks to bury them all beneath Lake Winnipeg.','Liam Neeson, Laurence J. Fishburne III, Marcus Thomas, Amber Midthunder, Benjamin Walker','109 mins','15 Jul 2021','2021-07-28 10:19:10'),(8,'Ghost Mansion','Horror webtoon writer Ji-woo (Sung Joon) arrives at a shabby apartment called Gwanglim Mansion in search of ideas. The middle-aged caretaker with an expressionless facial expression unravels a bundle of strange events that happened in the apartment, and rooms 504, 708... The more Ji-woo hears the story, the more he becomes obsessed with the Ghost Mansion.','Sung Joon, Kim Bo-ra, Kim Hong-pa, Kim Jae-hwa, Park So-jin, Seo Hyun-woo','106 mins','15 Jul 2021','2021-07-28 10:21:36'),(9,'Free Guy','In \"Free Guy\", a bank teller who discovers he is actually a background player in an open-world video game, decides to become the hero of his own story- one he rewrites himself. Now in a world where there are no limits, he is determined to be the guy who saves his world his way- before it is too late. Starring Ryan Reynolds, Jodie Comer, Joe Keery, Lil Rel Howery, Utkarsh Ambudkar and Taika Waititi, \"Free Guy\" is directed by Shawn Levy from a story by Matt Lieberman and a screenplay by Lieberman and Zak Penn. The film is produced by Ryan Reynolds, Shawn Levy, Greg Berlanti, Sarah Schechter and Adam Kolbrenner with Mary McLaglen, Josh McLaglen, George Dewey, Dan Levine and Michael Riley McGrath serving as executive producers.','Ryan Reynolds, Jodie Comer, Joe Keery, Lil Rel Howery, Utkarsh Ambudkar, Taika Waititi','115 mins','12 Aug 2021','2021-07-28 10:24:00'),(10,'The Boss Baby: Family Business','In the sequel to DreamWorks Animation’s Oscar®-nominated blockbuster comedy, the Templeton brothers — Tim (James Marsden, X-Men franchise) and his Boss Baby little bro Ted (Alec Baldwin)—have become adults and drifted away from each other. Tim is now a married stay-at-home dad. Ted is a hedge fund CEO. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again… and inspire a new family business.','Alec Baldwin, Jeff Goldblum, Ariana Greenblatt, Jimmy Kimmel, Lisa Kudrow, Eva Longoria, James Marsden, Amy Sedaris','107 mins','5 Aug 2021','2021-07-28 10:25:37');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_movieid` int NOT NULL,
  `genres` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movieid_idx` (`fk_movieid`),
  CONSTRAINT `fk_movieid` FOREIGN KEY (`fk_movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
INSERT INTO `relationship` VALUES (1,1,'Action,Scifi'),(2,2,'Action,Thriller'),(3,3,'Comedy,Drama'),(4,4,'Horror,Thriller'),(5,5,'Horror,Thriller'),(6,6,'Animation,Adventure,Comedy'),(7,7,'Adventure,Drama,Thriller'),(8,8,'Adventure,Comedy'),(9,9,'Action,Comedy'),(10,10,'Animation');
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `userid` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `fk_movieid_review_idx` (`movieid`),
  KEY `fk_userid_idx` (`userid`),
  CONSTRAINT `fk_movieid_review` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,1,5,'Good Movie, love the action','2021-07-02 07:41:34'),(2,2,2,4,'Love this movie','2021-07-05 06:55:31'),(3,3,2,4,'This movie is funny. Hope to come and watch again.','2021-07-05 06:56:11'),(4,4,4,5,'Very scary','2021-07-05 06:56:42'),(5,5,5,5,'Bloody!','2021-07-05 06:57:20'),(6,3,3,4,'Nice Movie','2021-07-29 07:05:57'),(7,4,3,3,'So so movie!','2021-07-29 07:06:26'),(8,5,3,4,'Hope to watch again','2021-07-29 07:07:21'),(9,9,3,4,'Can\'t wait for it','2021-07-29 07:08:15'),(10,9,2,3,'Come out soon please','2021-07-29 07:10:16'),(11,8,2,4,'Interesting movie coming soon','2021-07-29 07:10:48'),(12,10,2,3,'Nice','2021-07-29 07:11:28'),(13,7,4,4,'Cool','2021-07-29 07:12:07'),(14,8,4,3,'Can\'t wait','2021-07-29 07:12:44'),(15,5,4,5,'love it','2021-07-29 08:10:35'),(16,6,4,4,'Nice show','2021-07-29 08:11:12'),(17,9,4,4,'Interesting','2021-07-29 08:14:40'),(18,10,4,4,'Waiting','2021-07-29 08:15:01'),(19,10,5,4,'I am so eager to watch this','2021-07-29 08:16:45'),(20,9,5,4,'Heard that it should be nice','2021-07-29 08:17:07'),(21,8,5,5,'I want to watch this again','2021-07-29 08:17:35'),(22,7,5,4,'Interesting experience','2021-07-29 08:18:01'),(23,6,5,4,'Very touching','2021-07-29 08:18:59'),(24,6,1,4,'Great movie','2021-07-29 08:19:39'),(25,7,1,4,'This is breathtaking','2021-07-29 08:20:41'),(26,8,1,3,'This is average','2021-07-29 08:21:21'),(27,9,1,2,'This sucks','2021-07-29 08:21:45'),(28,10,1,3,'Average','2021-07-29 08:22:00');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timing`
--

DROP TABLE IF EXISTS `timing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timing` (
  `screenid` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `screen_time_1` varchar(255) NOT NULL,
  `screen_time_2` varchar(255) NOT NULL,
  `screen_time_3` varchar(255) NOT NULL,
  PRIMARY KEY (`screenid`),
  KEY `fk_movieid_timing_idx` (`movieid`),
  CONSTRAINT `fk_movieid_timing` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timing`
--

LOCK TABLES `timing` WRITE;
/*!40000 ALTER TABLE `timing` DISABLE KEYS */;
INSERT INTO `timing` VALUES (1,1,'1330','1600','1900'),(2,2,'0800','1100','1400'),(4,3,'1045','1425','1630'),(5,4,'0900','1300','1700'),(6,5,'0945','1345','1800');
/*!40000 ALTER TABLE `timing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `profile_pic_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Terry Tan','terry@gmail.com','91234567','abc123456','Customer','/images/user_profile.jpg','2021-06-19 06:04:22'),(2,'Tommy','tommy@gmail.com','93947293','123','Customer','/images/user_profile.jpg','2021-07-05 06:24:20'),(3,'Tom','tom@gmail.com','92748473','qwer1234','Admin','/images/user_profile.jpg','2021-07-05 06:25:16'),(4,'James','james@gmail.com','92744834','zxcv1234','Customer','/images/user_profile.jpg','2021-07-05 06:26:02'),(5,'Lucas','lucas@gmail.com','97127389','sdf234','Customer','/images/user_profile.jpg','2021-07-05 06:26:33');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sp_movie'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-07 20:24:53
