"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"); // refers to user.js once the firebase api keys are set-- fb-keys.js


// Using the REST API === from db-interactions.js
function loadSongsToDOM() {
  console.log("Need to load some songs, Buddy");
  let currentUser = user.getUser();
  db.getSongs(currentUser)
  //PH === .then gets the promise
  .then((songData) => {
    console.log("PHonethip got songs buddy", songData);
  //   var idArray = Object.keys(songData);
  //   // PH === add the loop
  //     idArray.forEach((key) =>{
  //     songData[key].id = key;
  //     console.log("song data", songData[key]);
  //     //PH === songData should now have key associated with it
  // }); // this section is noted out when there are users options
  templates.makeSongList(songData);
});
}

// loadSongsToDOM(); //<--Move to auth section after adding login btn; gets noted out when you require a user

// Send newSong data to db then reload DOM with updated song data
$(document).on("click", ".save_new_btn", function() {
  let songObj = buildSongObj (); // PH - refers to buildSongObj() line 51 below and grab all the things from the form and return that object
  db.addSong(songObj)
  .then((songID) =>{
    console.log("What is the new songID", songID);
    loadSongsToDOM();
  });
  
});

// PH --- EDIT YOUR SONG HERE: go get the song from database and then populate the form for editing.
$(document).on("click", ".edit-btn", function () {
    let songID = $(this).data("edit-id");
    console.log("song id", songID);
    db.getSong(songID) // PH === go get the song from the database
    .then((song) => {
        return templates.songForm(song, songID);
    })
    .then((finishedForm) => {
      $(".uiContainer--wrapper").html(finishedForm);
    });

});

//Save edited song to FB then reload DOM with updated song data
$(document).on("click", ".save_edit_btn", function() {
  let songObj = buildSongObj(),
  songID = $(this).attr("id");
  console.log("songID", songID);
  db.editSong(songObj, songID) //PH === edit song content
  .then((data) => {
    loadSongsToDOM(); // load the request to the DOM
  });
});

// Remove song then reload the DOM w/out new song
$(document).on("click", ".delete-btn", function () {
  let songID = $(this).data("delete-id");
  db.deleteSong(songID) // PH === you want to delete a song
  .then(() => {
      loadSongsToDOM();
  });
});

////// ADDED from Var branch //////////

$("#view-songs").click(function() {
  $(".uiContainer--wrapper").html("");
  loadSongsToDOM();
});

///////////////////////////////

// Helper functions for forms stuff. Nothing related to Firebase
// Build a song obj from form data.
function buildSongObj() {
    let songObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val(),
    uid: user.getUser()
  };
  return songObj;
}

// Load the new song form . PH === this is the add song button in the nav bar area
$("#add-song").click(function() {
  console.log("clicked add song");
  var songForm = templates.songForm()
  // PH - templates = require("./dom-builder"); line 32 of dom-builder.js === function songForm(song, songId) {
  .then(function(songForm) {
    $(".uiContainer--wrapper").html(songForm); //PH - line 20 of HTML
  });
});


$("#auth-btn").click(function(){
  console.log("clicked on Signin");
  user.logInGoogle()// PH== in user.js file for user to log in to load then...
  .then((result) => {
    console.log("result from login", result.user.uid);
   user.setUser(result.user.uid);
    $("#auth-btn").addClass("is-hidden");// Once the user is login make the button hidden and...
    $("#logout").removeClass("is-hidden");// then remove the class when you logout
    loadSongsToDOM(); // Now we will load the songs 
  });
});

$("#logout").click(function(){
  console.log("logout clicked");
  user.logOut();
});