# Minder
### Overview
Application for providing statistics of your thoughts. 

### Prerequisites
- Installed MongoDB
- Installed Node.js
- Free http://localhost:3000


### Local instance

You can get you local copy of project for developer purposes. Just repeat this sequence:

**mongod** — run in separate console tab. Mongo shoul be up and runnibg.

**cd ~/Sites/minder** — go to project's directory

**npm install** — install application

**forever -w ./bin/www** — run application

**npm test** — run application tests

**http://localhost:3000** — open in browser

### API testing

**mongod** — run in separate console tab. Mongo shoul be up and runnibg.

**npm start** — run application

**endpoints** are shown in 

![Alt text](https://dl.dropboxusercontent.com/u/929613/minder/Screenshot%202015-05-28%2012.22.37.png)


**accessToken=1234567890** — will grants access as authorized user. Pass them in request's body in case of POST request, and in query in case of GET request. Make sure that in your database you have at least one user, because of this hack uses first found user. 


### Commands
**npm install** — installs application with all the dependencies.

**npm start** — starts application once. It's of for running tests or deployment, lets say, to Heroku.

**npm test** — run test suit before pushig to main repo, to make sure that everything's fine.

**forever -w ./bin/www** — run Node.js in development mode, which allows to restart server automatically after file modifications.
 
**git push heroku master** — pushing to Heroku, which causes immidiate deploy process of new version of application.

**mongo ds029787.mongolab.com:29787/heroku_app34570337 -u me -p ok** — connecting to remote Mongo. Beware, this is production database!

