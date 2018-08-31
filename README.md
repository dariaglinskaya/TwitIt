# TwitIt app

A Twitter clone application made using React+Redux, NodeJS, PassportJS, Typescript, MongoDB(MLab).  
https://twititapp.herokuapp.com/  
You can:  
1. Register
2.  Log in
3. Add tweet
4. Like
5. Retweet
6. See user's tweet
7. See your own tweets and tweets you retweeted
8. Search users
9. Subscribe
10. See twets of users you subscribed

## Getting Started

The app can be run on your local maschine or deployed to Heroku.
### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install dependencies

```
npm install
```

Run client side

```
cd client  
npm start
```  

Run server side on ANOTHER console(from the root directory)

```
cd server 
npm start
```  

Client side will be running on the 3000 port.

## Running the tests

Tests written using Jest.

### Break down into end to end tests

Root directory

```
npm test
```

### Client side

Test React components by imitating behaviour.

```
cd client  
npm test
```

## Deployment

The app can be deployed to heroku. You should be registered and installed Heroku Shell.   Also you should initialize git repo  
More information here: [Heroku Introduction](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
```
git clone https://github.com/dariaglinskaya/TwitIt.git  
cd TwitIt  
heroku create
git push heroku master
heroku open
```
