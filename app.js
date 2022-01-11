'use strict';

const express = require('express');
// express() -> singleton pattern that makes one app. Returns an object that can be modified.
const app = express();


//app.get(); //this method/unc. modifies our app singleton.

//2 things 
// route - string 
//callback fun. - tells the route what to do , using 2 params: Request and Response

const messages = [];
class Message {
  constructor(text, author) {
    this.text = text;
    this.author = author;
  }
}





app.get('/message', (req, res) => {
  //create a message and send it back
  console.log('Someone sent a request!: + req.method');

  res.send(messages);
});

function createMessage(req, res, next) {
  const messageText = req.query.text;
  const authorName = req.query.author;

  console.log('First message is created!');

  if(!messageText || !authorName) {
    next('no Text or author');
  } else {
    const message = new Message(messageText, authorName);
  }

  //we modify,
  req.message = message;
  next();
}

function saveMessage(req, res, next) {
  console.log('We can see any data that was added to the request', req.message);
  let message = req.message;
  messages.push(message);
  next();
}

//POST -> http:/:localhost:3000/message?text=SomeString&author=Jacob
app.post('/message', createMessage, saveMessage, (req, res, next) => {
//   const messageText = req.query.text;
//   const authorName = req.query.author;

  //   next('an error has occured');

  //   const message = new Message(messageText, authorName);//creates message
  //   messages.push(message);
  res.send(messages);
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.send('Error handler hit!');
});

app.use(function (req, res) {
  res.status(404).send('***** Nothing found *****');
});

// module.exports = app;

module.exports = {
  start: function (port) {
    app.listen(port, () => {
      console.log('app is running on : ' + port);
    });
  },
  app,
};