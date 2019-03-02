require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var args = process.argv;
var searchArr = args.slice(3);
var search = searchArr.join(" ");

var queryUrl_1 = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
var queryUrl_2 = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";


// This is the axios request for BandsInTown
if (process.argv[2] == "concert-this") {
        console.log(search);
        console.log("====================");

axios
    .get(queryUrl_1)
    .then(function(response){
        for (i=0; i<response.data.length; i++) {
        // var momentDate = moment(response.data[i].datetime);
        // var date = moment(momentDate).format('MMMM Do YYYY, h:mm:ss a');
        var venue_info = response.data[i].venue.name + "\n" + response.data[i].venue.city + ", " + response.data[i].venue.region + "\n" + response.data[i].datetime;
       
        console.log(venue_info);
        console.log("====================")
        // console.log(date);
        }
    })

    .catch(function(error){
        if (error.response) {
            console.log(error);
        }
    })
};


// This is the axios request for OMDB
if (process.argv[2] == "movie-this") {
    console.log(search);
    console.log("====================");
    

axios

.get(queryUrl_2)
.then(function(response){
    console.log("Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Year);
    console.log(response.data.Ratings[0].Source + ": " + response.data.Ratings[0].Value);
    console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
    console.log(response.data.Country);
    console.log(response.data.Language);
    console.log(response.data.Plot);
    console.log("Actors: " + response.data.Actors);
})

.catch(function(error){
    if (error.response) {
        console.log(error);
    }
})
};


// This is the request for Spotify
if (process.argv[2] == "spotify-this-song") {
    console.log(search);
    console.log("====================");
    defaultSearch();

    spotify
    .search({ type: 'track', query: search, limit: 1 })
    .then(function(response) {
      console.log("Artist's Name: " + response.tracks.items[0].album.artists[0].name);
      console.log("Song Name: " + response.tracks.items[0].name);
      console.log("Album Name: " + response.tracks.items[0].album.name);
      console.log("Song Link: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
    //   console.log(response.tracks.items);
    })
    .catch(function(err) {
      console.log(err);
    });
};

function defaultSearch () {
    if (process.argv[2] == "spotify-this-song" && search == "") {
        search = "The Sign";
        console.log(search);
    }
    if (process.argv[2] == "movie-this" && search == "") {
        search = "Mr Nobody";
        console.log(search);
    }
}
