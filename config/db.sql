DROP DATABASE `projet7bdd`;

CREATE DATABASE IF NOT EXISTS `projet7bdd`;

USE `projet7bdd`;

CREATE TABLE IF NOT EXISTS `user` (
    `id_user` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(155) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL UNIQUE,
    `user_password` VARCHAR(255) NOT NULL,
    `user_job` VARCHAR(255) NOT NULL,
    `active` INT DEFAULT 1,
    `user_picture` VARCHAR(255),
    PRIMARY KEY (`id_user`)
);

CREATE TABLE IF NOT EXISTS  `post` (
    `id_post` INT NOT NULL AUTO_INCREMENT,
    `post_content` TEXT NOT NULL,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`id_post`),
    CONSTRAINT `id_post_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `comment` (
    `id_comment` INT NOT NULL AUTO_INCREMENT,
    `comment_content` TEXT NOT NULL,
    `id_post` INT NOT NULL,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`id_comment`),
    CONSTRAINT `id_comment_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
    CONSTRAINT `id_comment_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `like` (
    `id_like` INT NOT NULL AUTO_INCREMENT,
    `like_value` INT NOT NULL DEFAULT 0,
    `id_post` INT NOT NULL,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`id_like`),
    CONSTRAINT `id_like_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
    CONSTRAINT `id_like_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `role` (
    `id_role` INT NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(155) NOT NULL,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`id_role`),
    CONSTRAINT `id_role_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE 
);
