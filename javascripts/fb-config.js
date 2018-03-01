"use strict";

let firebase = require("firebase/app"), // PH=== in node modules
    fb = require("./fb-key"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: fbData.apiKey,
  authDomain: fbData.authDomain,
  databaseURL: fbData.databaseURL
};

firebase.initializeApp(config);

// GETTER allowing the config to return keys
firebase.getFBsettings = function(){
	 console.log("getFBsettings", config);
	 return config;
};

// firebase.initializeApp(config);
module.exports = firebase;
