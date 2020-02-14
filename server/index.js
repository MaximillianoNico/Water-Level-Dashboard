const BlynkLib = require('blynk-library');
const mongoose = require('mongoose');
const _get = require('lodash/get');
const _isEmpty = require('lodash/isEmpty');
const { Logs } = require('./internal/model');

const Auth = require('./internal/http/auth');
const Statistic = require('./internal/http/statistic');

const express = require('express');
const APP = express();

require('dotenv').config()
 
const blynk = new BlynkLib.Blynk(process.env.BLYNK_API_KEY || '2pqrVNOrS7s87thzBuJGyKrmxwms5oBE');
const v1 = new blynk.VirtualPin(1);
const v9 = new blynk.VirtualPin(9);

mongoose.connect('mongodb://admin:admin123@ds219459.mlab.com:19459/blynk-db', {useNewUrlParser: true, useUnifiedTopology: true});


const setDelay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

v1.on('write', function(param) {
  const payload = {
    createAt: _get(param, 'createAt', ''),
    point: _get(param, 'value', 0),
    device: ''
  };
  if (!_isEmpty(param)) {
    async function init(){
      await setDelay(500);
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


APP.use('/rest-user', Auth);
APP.use('/dashboard', Statistic);

APP.listen(8080, () => {
  console.log('Server API Running at port 8080');
});