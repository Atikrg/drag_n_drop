-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2024 at 11:17 AM
-- Server version: 10.4.32-MariaDB-log
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `text` varchar(191) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `text`, `user_id`) VALUES
(2, 'Review pull requests', 2),
(3, 'Fix bugs in the feature module', 3),
(4, 'Write unit tests', 4),
(8, 'Complete project documentation', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `Task_user_id_fkey` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `Task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
