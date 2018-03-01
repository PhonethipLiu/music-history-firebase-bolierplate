"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./fb-config");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs(user) {
  return $.ajax({
     url:`${firebase.getFBsettings().databaseURL}/songs.json?orderBy="uid"&equalTo="${user}"` // comes out in config now
     // "https://music-history-exercise.firebaseio.com/songs.json"
  }).done((songData) => {
    //.done is when you are done grabbing the json do something else
    return songData;
  });
}

// PH === links to main.js for songID; we are creating a new song and adding it to the firebase data
function addSong(songFormObj) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/songs.json`,
    // url: "https://music-history-exercise.firebaseio.com/songs.json", // use this when there is no user login requirement
    type: 'POST', // PH- Firebase is expecting it be POST
    data: JSON.stringify(songFormObj), // PH -- telling firebase to make big giant string
    dataType: 'json' // PH == this is the C. in the CRUD == create
  }).done((songID) => {
      return songID;
  });
}
// POST - Submits data to be processed to a specified resource. Takes one parameter.

function deleteSong(songID) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/songs/${songID}.json`,
    // url: `https://music-history-exercise.firebaseio.com/songs/${songID}.json`, // use this when there is no user login requirement
    method: "DELETE"
  }).done((data) => {
    return data;
  });
}

function getSong(songID) {
  return $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/songs/${songID}.json`
      // url:`https://music-history-exercise.firebaseio.com/songs/${songID}.json` // use this when there is no user login requirement
  }).done((songData) => {
    return songData;
  }).fail((error) => {
    return error;
  });
}

// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource. Takes two parameters.
function editSong(songFormObj,songID) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/songs/${songID}.json`,
    // url: `https://music-history-exercise.firebaseio.com/songs/${songID}.json`, // use this when there is no user login requirement
    type: 'PUT',
    data: JSON.stringify(songFormObj)
  }).done((data) => {
    return data;
  });
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};
