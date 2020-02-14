const BlynkLib = require('blynk-library');

require('dotenv').config()
 
const blynk = new BlynkLib.Blynk(process.env.BLYNK_API_KEY || '2pqrVNOrS7s87thzBuJGyKrmxwms5oBE');
const v1 = new blynk.VirtualPin(1);
const v9 = new blynk.VirtualPin(9);
 
v1.on('write', function(param) {
  console.log('V1:', param);
});
 
v9.on('read', function() {
  v9.write(new Date().getSeconds());
});
