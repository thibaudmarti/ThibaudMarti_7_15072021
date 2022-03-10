CREATE DATABASE IF NOT EXISTS `projet7bdd`;

USE `projet7bdd`;

CREATE TABLE IF NOT EXISTS `user` (
    `id_user` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(155) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL UNIQUE,
    `user_password` VARCHAR(255) NOT NULL,
    `user_job` VARCHAR(255) NOT NULL,
    `user_picture` VARCHAR(255),
    `user_admin` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_user`)
);


CREATE TABLE IF NOT EXISTS  `post` (
    `id_post` INT NOT NULL AUTO_INCREMENT,
    `post_content` TEXT NOT NULL,
    `post_image` VARCHAR(255),
    `post_video` VARCHAR(255),
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
    `like_post` INT NOT NULL,
    `like_author` INT NOT NULL,
    PRIMARY KEY (`id_like`),
    FOREIGN KEY (`like_author`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
    FOREIGN KEY (`like_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE
);