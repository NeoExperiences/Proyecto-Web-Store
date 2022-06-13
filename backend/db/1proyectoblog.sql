-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2022 at 03:26 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `1proyectoblog`
--

-- --------------------------------------------------------

--
-- Table structure for table `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `postName` varchar(256) NOT NULL,
  `postContent` varchar(2048) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `picture` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articulos`
--

INSERT INTO `articulos` (`id`, `postName`, `postContent`, `userID`, `picture`) VALUES
(1, 'Como desatornillar un ventilador.', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 1, 'https://via.placeholder.com/150/92c952'),
(2, 'Como formatear como Fat32.', 'ßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßßv', 3, NULL),
(3, 'Bitcoin, los tulipanes del futuro.', '0', 4, NULL),
(4, 'Havok 2015 Herramientas y Documentacion.', '0', 2, 'https://via.placeholder.com/150/d32776'),
(5, 'Los mejores remixes del 2004.', '0', 2, NULL),
(6, 'Counter-Strike 1.6 No-Steam', '0', 2, NULL),
(7, 'Actualizacion de reglamento.', '0', 1, NULL),
(9, 'Bots para Rakion 2021 (Funcionando).', '0', 5, NULL),
(20, 'Probando', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ultrices est. Sed eu hendrerit neque. Curabitur nec dolor odio. Cras venenatis, mauris ac finibus euismod, orci tortor vehicula purus, id cursus velit tortor quis risus. Vestibulum metus arcu, vestibulum eu sagittis nec, condimentum at metus. Quisque eu semper arcu, id dignissim libero. Integer at viverra lorem, nec malesuada neque. Maecenas sodales odio at lorem pretium, ut ornare ante accumsan. Morbi at dictum lectus. In pretium suscipit scelerisque. Nulla urna nibh, accumsan eu ante et, aliquam tincidunt sem. Pellentesque viverra malesuada commodo.', 16, ''),
(21, 'Buenas tardes.', '21 5 3 27 8aaaaaaaa', 16, ''),
(22, '123', '123', 16, ''),
(23, '123', '123', 16, ''),
(24, '123', '123', 16, ''),
(25, '123', '123', 16, ''),
(26, '123', '123', 16, ''),
(27, '123', '123', 16, '');

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `userComment` varchar(256) NOT NULL,
  `userID` int(11) NOT NULL,
  `postID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`id`, `userComment`, `userID`, `postID`) VALUES
(1, 'Muy bueno!', 3, 5),
(2, 'Perfecto!', 3, 2),
(3, 'Aburrido.', 3, 3),
(4, 'Generico.', 3, 1),
(5, 'Increible!', 1, 2),
(6, 'Emocionante!', 1, 4),
(7, 'Impresionante!', 5, 3),
(9, 'Increible!', 1, 5),
(11, 'Impresionante!', 11, 6),
(17, 'Tremendo!', 5, 1),
(18, 'Lorem Ipsum!', 3, 6),
(19, 'Lorem Ipsum!', 12, 2),
(20, 'Cosa.', 12, 1),
(21, 'Cosa bonita.', 12, 2),
(22, 'Cosa bien hecha.', 12, 2),
(23, 'jsjs', 12, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'client');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `address` varchar(256) DEFAULT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `email`, `address`, `role`) VALUES
(1, 'Juan Calvo', '$2b$10$zxGxNq5N9wThlI9d/DykK.qzG63aHWWQy/lQX3610YmmUlX0LxkeK', 'JuanCalvo@fakemail.com', '0', 1),
(2, 'Jorge Almafuerte', '', 'JajAlma@gmail.com', '0', 1),
(3, 'Esteban Flores', '', 'Queseyoinc@hotmail.com', 'Racedo 460', 2),
(4, 'Kevin Rodriguez', '', 'KevRod@coldmail.com', 'Av. Colon 355', 2),
(5, 'Ignacio Martinez', '', 'IgnacioMartinez89@hotmail.com', '0', 2),
(11, 'JuanCalvo', '$2b$10$9tXXNWMkaAUXbv2ijvy30eyaItsa.hVb.b7COelQjisRtcj.CXUY6', '111', '111', 2),
(12, '5555', '$2b$10$6Vg3KYuWrQWiUkG/rtWPWepSDr5z/HoX.fByIGKzvmGxmusppfkCu', '5555', '5555', 2),
(16, 'Neo', '$2b$10$7Kn8uLrSTkskDztVhTrSK.dB0mXlL.MWwtBDLW/e0JphKu9BzaJAe', '123@hmail.com', 'Yrigoyen 3556', 1),
(19, '9999', '$2b$10$5qtgORNvruGgBInv7mdH6.so2DYFjGSlxZvrCtcMJP6mxB055aiUC', '9999', '9999', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `postID` (`postID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `articulos_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `articulos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
