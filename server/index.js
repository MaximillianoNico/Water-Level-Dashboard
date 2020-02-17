const BlynkLib = require('blynk-library');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const utils = require('./utils');


require('dotenv').config()
 
const blynk = new BlynkLib.Blynk(process.env.BLYNK_API_KEY || '2pqrVNOrS7s87thzBuJGyKrmxwms5oBE');
const v1 = new blynk.VirtualPin(1);
const v9 = new blynk.VirtualPin(9);

const _get = require('lodash/get');
const _isEmpty = require('lodash/isEmpty');
const Logs = require('./internal/model');
const Auth = require('./internal/http/auth');
const Statistic = require('./internal/http/statistic');

const express = require('express');
const app = express();

/**
 * Mongoose Init
 */
mongoose.connect('mongodb://admin:admin123@ds219459.mlab.com:19459/blynk-db', {useNewUrlParser: true, useUnifiedTopology: true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function (dbURI) {  
  console.log('Success Connect MONGODB');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

/**
 * Blynk Connection
 */
const LIMIT_PER_SECOND = 500;
v1.on('write', function(param) {
  const payload = {
    createAt: _get(param, 'createAt', ''),
    point: _get(param, 'value', 0),
    device: ''
  };
  if (!_isEmpty(param)) {
    async function init(){
      await utils.setDelay(LIMIT_PER_SECOND);
      Logs.insertMany([payload], (err) => {
        if(err) console.log('Error (DB) : ', err);
      });
    };
  }
  console.log('params : ', param);
});
 
v9.on('read', function() {
  v9.write(new Date().getSeconds());
});

const terminal = new blynk.WidgetTerminal(1);
terminal.on('write', (data) => {
  terminal.write('you write : ', data, ' \n');
  blynk.notify('OK Boomer : ', data);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Endpoint Dashboard
 */
app.use('/rest-user', Auth);
app.use('/dashboard', Statistic);

app.listen(5000, () => {
  console.log('Server API Running at port: 5000');
});