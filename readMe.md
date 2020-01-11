
## Installation

This is a CRUD app. It works with Nodejs server and Postgres database.

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 12.14.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install
```
Download and install Postgres(https://www.pgadmin.org/download/).
pgAdmin 4 or higher is required.


## Features

  * Creating table of required values
  * Reading table of required values
  * Updating table of required values
  * Deleting required values from the table
  * Focus on high performance
  * Super-high test coverage  

## Docs & Community

  * [Postgres documentation](https://www.pgadmin.org/docs/) 
  * [Bitbucket documentation](https://www.atlassian.com/git/tutorials) 
  * [Nodejs documentation](https://nodejs.org/en/docs/)  

## Quick Start

  The quickest way to get started with our CRUD App just to follow next steps:
  
  * Create Database name: "postgres" [screenshot](https://prnt.sc/qgslga);
  * Follow by path : postgres => Schemas => Tables;
  * Click on Tables and go to top menu => click on Tools => Query tool;
  * To create table => copy and put in Query editor this code:
  * ```sql 
    CREATE TABLE student(
   user_id integer PRIMARY KEY,
   firstname VARCHAR (40), 
   lastname VARCHAR (40),
   age VARCHAR (40),
   city VARCHAR (40)
  );
  ```
  * Open file server.js and write in row 12 your password from postgres 4 admin;
  * Install dependencies:

  ```bash
  $ npm install
  ```
  * Start the server:

  ```bash
  $ node server
  ```
  * View the website at: http://localhost:8080/public/index.html  
 
## Examples

  To view the examples, clone the ProjectOne repo and install the dependencies:

```bash
$ git clone https://LetsGetLift@bitbucket.org/deveducationprojectone/projectone.git
```


## Tests
 

## Contributing

## People

Created by: Anonymous creators.

