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
    `post_author` INT NOT NULL,
    PRIMARY KEY (`id_post`),
    FOREIGN KEY (`post_author`) REFERENCES `user` (`id_user`) ON DELETE CASCADE    
);

CREATE TABLE IF NOT EXISTS `comment` (
    `id_comment` INT NOT NULL AUTO_INCREMENT,
    `comment_content` TEXT NOT NULL,
    `comment_post` INT NOT NULL,
    `comment_author` INT NOT NULL,
    PRIMARY KEY (`id_comment`),
    FOREIGN KEY (`comment_author`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
    FOREIGN KEY (`comment_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `likes` (
    `id_like` INT NOT NULL AUTO_INCREMENT,
    -- `like_value` INT NOT NULL DEFAULT 0,
    `like_post` INT NOT NULL,
    `like_author` INT NOT NULL,
    PRIMARY KEY (`id_like`),
    FOREIGN KEY (`like_author`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
    FOREIGN KEY (`like_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `role` (
    `id_role` INT NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(155) NOT NULL,
    `role_user` INT NOT NULL,
    PRIMARY KEY (`id_role`),
    FOREIGN KEY (`role_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE 
);
