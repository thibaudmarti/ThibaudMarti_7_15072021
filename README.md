# ThibaudMarti_7_15072021

-- Database install :

In terminal :
$ mysql -u root -p < db_config.sql

Or in MySql Workbench :
Click on the icon "Open a SQL script file in a new query tab" then put the "/config/db_config.sql" file in the query tab, then execute the script.

-- Backend install and start :

from cloned folder :
$ touch .env
Then check the file .env.example to see what you have to put in the .env file.
$ npm install

$ npm start

-- Frontend install and start :

from cloned folder :
$ cd ./client
$ npm install

$ npm start

-- Admin info

To connect with one of the 2 admin account, in the login form put the email and the password that you entered in the .env file.
