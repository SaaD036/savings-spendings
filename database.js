const admin = require('firebase-admin');

const serviceAccount = require("./firebase_key.json");
const firebase = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://application-demo-3d54b.firebaseio.com"
});

console.log('firebase connected successfully');

const database = admin.database();

module.exports = database;