'use strict';

const express = require('express');
// express() -> singleton pattern that makes one app. Returns an object that can be modified.
const app = express();
app.get(); //this method/unc. modifies our app singleton.

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

  res.send('Here is a message');
});

function createMessage(req, res, next) {
  const messageText = req.query.text;
  const authorName = req.query.author;

  const message = new Message(messageText, authorName);
  req.message = message;
  next();
}

function saveMessage(req, res, next) {
  let message = req.message;
  message.push(message);
  next();
}

//POST -> http:/:localhost:3000/message?text=SomeString&author=Jacob
app.post('/message', (req, res, next) => {
  const messageText = req.query.text;
  const authorName = req.query.author;

  next('an error has occured');

  const message = new Message(messageText, authorName);//creates message
  messages.push(message);
  res.send(message);
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