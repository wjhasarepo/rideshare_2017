-- MySQL dump 10.13  Distrib 5.5.52, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: rideshare
-- ------------------------------------------------------
-- Server version	5.5.52-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) DEFAULT NULL,
  `make` varchar(128) DEFAULT NULL,
  `model` varchar(128) DEFAULT NULL,
  `color` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`car_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `device_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_users`
--

DROP TABLE IF EXISTS `device_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `phone_number` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `encrypted_password` varchar(128) DEFAULT '',
  `sign_in_count` int(11) DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(128) DEFAULT NULL,
  `last_sign_in_ip` varchar(128) DEFAULT NULL,
  `failed_attempts` int(11) DEFAULT '0',
  `locked_at` datetime DEFAULT NULL,
  `unlock_token` varchar(128) DEFAULT NULL,
  `token` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_users`
--

LOCK TABLES `device_users` WRITE;
/*!40000 ALTER TABLE `device_users` DISABLE KEYS */;
INSERT INTO `device_users` VALUES (1,'wayne','jiao','888-666-2017','waynejiao@rideshare.com','$2a$10$xexqWISr/8sAbRIHIm/A8uDbiYV13VtJkOEd/mr71UTrBKVRkdt9O',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:10:01','2017-11-16 10:10:01'),(2,'randy','kenapp','333-222-2017','waynejiao@rideshare.com','$2a$10$ImfJNuq6AbP72yvbBKV3nOfPWxFISeGQJBmXzWDXHwl3hKMsXmMd6',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:10:41','2017-11-16 10:10:41'),(3,'jim','han','111-444-2017','jimhan@rideshare.com','$2a$10$QcpEioJo3Ydk1JNHJN1V3uUfQ8TNh7oloNFMjJLRjkI4oRdUDL8LW',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:11:05','2017-11-16 10:11:05'),(4,'your','boss','777-222-2017','yourboss@rideshare.com','$2a$10$Co2A8wdzY6hkyXdWGWrBcO7FcRBKQB9z7bPmNbkQYocEUd5nEqDui',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:11:58','2017-11-16 10:11:58');
/*!40000 ALTER TABLE `device_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides_matched`
--

DROP TABLE IF EXISTS `rides_matched`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rides_matched` (
  `ride_match_id` int(11) NOT NULL AUTO_INCREMENT,
  `ride_request_id` int(11) NOT NULL,
  `ride_offer_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ride_match_id`),
  KEY `ride_offer_id` (`ride_offer_id`),
  KEY `ride_request_id` (`ride_request_id`),
  CONSTRAINT `rides_matched_ibfk_1` FOREIGN KEY (`ride_offer_id`) REFERENCES `rides_offered` (`ride_offer_id`) ON DELETE CASCADE,
  CONSTRAINT `rides_matched_ibfk_2` FOREIGN KEY (`ride_request_id`) REFERENCES `rides_requested` (`ride_request_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides_matched`
--

LOCK TABLES `rides_matched` WRITE;
/*!40000 ALTER TABLE `rides_matched` DISABLE KEYS */;
INSERT INTO `rides_matched` VALUES (1,1,1,'2017-11-16 16:29:13','2017-11-16 16:29:13'),(2,1,1,'2017-11-16 16:31:41','2017-11-16 16:31:41');
/*!40000 ALTER TABLE `rides_matched` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides_offered`
--

DROP TABLE IF EXISTS `rides_offered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rides_offered` (
  `ride_offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `offer_time` datetime DEFAULT NULL,
  `start_address` varchar(128) DEFAULT NULL,
  `start_lat` decimal(16,12) DEFAULT NULL,
  `start_lng` decimal(16,12) DEFAULT NULL,
  `destination_address` varchar(128) DEFAULT NULL,
  `destination_lat` decimal(16,12) DEFAULT NULL,
  `destination_lng` decimal(16,12) DEFAULT NULL,
  `available_passengers` int(11) DEFAULT NULL,
  `available_bags` int(11) DEFAULT NULL,
  `flexible_value` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ride_offer_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `rides_offered_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `device_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides_offered`
--

LOCK TABLES `rides_offered` WRITE;
/*!40000 ALTER TABLE `rides_offered` DISABLE KEYS */;
INSERT INTO `rides_offered` VALUES (1,2,'2017-05-01 16:00:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'660 Parrington Oval, Norman, OK 73019, USA',35.209157600000,-97.445693400000,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00'),(2,3,'2017-05-01 16:10:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'660 Parrington Oval, Norman, OK 73019, USA',35.209157600000,-97.445693400000,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00'),(3,4,'2017-05-01 16:20:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'1320 W Lindsey St, Norman, OK 73069, USA',35.209157600000,-97.445693400000,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00');
/*!40000 ALTER TABLE `rides_offered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides_requested`
--

DROP TABLE IF EXISTS `rides_requested`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rides_requested` (
  `ride_request_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `passengers` int(11) DEFAULT NULL,
  `bags` int(11) DEFAULT NULL,
  `request_time` datetime DEFAULT NULL,
  `start_address` varchar(128) DEFAULT NULL,
  `start_lat` decimal(16,12) DEFAULT NULL,
  `start_lng` decimal(16,12) DEFAULT NULL,
  `destination_address` varchar(128) DEFAULT NULL,
  `destination_lat` decimal(16,12) DEFAULT NULL,
  `destination_lng` decimal(16,12) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ride_request_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `rides_requested_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `device_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides_requested`
--

LOCK TABLES `rides_requested` WRITE;
/*!40000 ALTER TABLE `rides_requested` DISABLE KEYS */;
INSERT INTO `rides_requested` VALUES (1,1,1,1,'2017-05-01 16:10:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'100 W Reno Ave, Oklahoma City, OK 73102',35.203349000000,-97.461788000000,'1000-01-01 00:00:00','1000-01-01 00:00:00');
/*!40000 ALTER TABLE `rides_requested` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides_transactions`
--

DROP TABLE IF EXISTS `rides_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rides_transactions` (
  `ride_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `ride_match_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ride_transaction_id`),
  KEY `ride_match_id` (`ride_match_id`),
  CONSTRAINT `rides_transactions_ibfk_1` FOREIGN KEY (`ride_match_id`) REFERENCES `rides_matched` (`ride_match_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides_transactions`
--

LOCK TABLES `rides_transactions` WRITE;
/*!40000 ALTER TABLE `rides_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `rides_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `device_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-20 10:13:39
