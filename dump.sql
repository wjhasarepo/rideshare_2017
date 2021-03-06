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
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `device_users`
--

LOCK TABLES `device_users` WRITE;
/*!40000 ALTER TABLE `device_users` DISABLE KEYS */;
INSERT INTO `device_users` VALUES (1,'wayne','jiao','888-666-2017','waynejiao@rideshare.com','$2a$10$xexqWISr/8sAbRIHIm/A8uDbiYV13VtJkOEd/mr71UTrBKVRkdt9O',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:10:01','2017-11-16 10:10:01'),(2,'randy','kenapp','333-222-2017','waynejiao@rideshare.com','$2a$10$ImfJNuq6AbP72yvbBKV3nOfPWxFISeGQJBmXzWDXHwl3hKMsXmMd6',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:10:41','2017-11-16 10:10:41'),(3,'jim','han','111-444-2017','jimhan@rideshare.com','$2a$10$QcpEioJo3Ydk1JNHJN1V3uUfQ8TNh7oloNFMjJLRjkI4oRdUDL8LW',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:11:05','2017-11-16 10:11:05'),(4,'your','boss','777-222-2017','yourboss@rideshare.com','$2a$10$Co2A8wdzY6hkyXdWGWrBcO7FcRBKQB9z7bPmNbkQYocEUd5nEqDui',0,'1000-01-01 00:00:00','1000-01-01 00:00:00',NULL,NULL,0,'1000-01-01 00:00:00',NULL,NULL,'2017-11-16 10:11:58','2017-11-16 10:11:58');
/*!40000 ALTER TABLE `device_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rides_matched`
--

LOCK TABLES `rides_matched` WRITE;
/*!40000 ALTER TABLE `rides_matched` DISABLE KEYS */;
INSERT INTO `rides_matched` VALUES (1,1,1,'2017-11-16 16:29:13','2017-11-16 16:29:13'),(2,1,1,'2017-11-16 16:31:41','2017-11-16 16:31:41');
/*!40000 ALTER TABLE `rides_matched` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rides_offered`
--

LOCK TABLES `rides_offered` WRITE;
/*!40000 ALTER TABLE `rides_offered` DISABLE KEYS */;
INSERT INTO `rides_offered` VALUES (1,2,'2017-05-01 16:00:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'660 Parrington Oval, Norman, OK 73019, USA',35.209157600000,-97.445693400000,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00'),(2,3,'2017-05-01 16:10:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'660 Parrington Oval, Norman, OK 73019, USA',35.209157600000,-97.445693400000,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00'),(3,4,'2017-05-01 16:20:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'1320 W Lindsey St, Norman, OK 73069, USA',35.209157600000,-97.445693400000,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00');
/*!40000 ALTER TABLE `rides_offered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rides_requested`
--

LOCK TABLES `rides_requested` WRITE;
/*!40000 ALTER TABLE `rides_requested` DISABLE KEYS */;
INSERT INTO `rides_requested` VALUES (1,1,1,1,'2017-05-01 16:10:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.395663800000,-97.596253200000,'100 W Reno Ave, Oklahoma City, OK 73102',35.203349000000,-97.461788000000,'1000-01-01 00:00:00','1000-01-01 00:00:00');
/*!40000 ALTER TABLE `rides_requested` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rides_transactions`
--

LOCK TABLES `rides_transactions` WRITE;
/*!40000 ALTER TABLE `rides_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `rides_transactions` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2017-11-20 11:08:36
