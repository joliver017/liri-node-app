require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var args = process.argv;
var searchArr = args.slice(3);
var search = searchArr.join(" ");

var bands_URL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
var movies_URL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";


// This is the axios request for BandsInTown
if (process.argv[2] == "concert-this") {
    console.log(search);
    console.log("====================");

    axios
        .get(bands_URL)
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
    if (!search) {
        search = "Mr Nobody";
        movies_URL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    }
    console.log(search);
    console.log("====================");

    axios
        .get(movies_URL)
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
    if (!search) {
        search = "The Sign";
    }

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







// This is the request for executing what the txt file says
if (process.argv[2] == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }

        data = data.split(", ");
        console.log(data);

        if (data[0] == "spotify-this-song") {
            console.log(data[1]);
            console.log("====================");
        
            spotify
            .search({ type: 'track', query: data[1], limit: 1 })
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

        if (data[0] == "movie-this") {
            var readMe_movies_URL = "http://www.omdbapi.com/?t=" + data[1] + "&y=&plot=short&apikey=trilogy";
            console.log(data[1]);
            console.log("====================");
            
        
        axios
        
        .get(readMe_movies_URL)
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

    if (data[0] == "concert-this") {
            var readMe_bands_URL = "https://rest.bandsintown.com/artists/" + data[1] + "/events?app_id=codingbootcamp"
            console.log(data[1]);
            console.log("====================");
    
    axios
        .get(readMe_bands_URL)
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
        

    });
};

// function defaultSearch () {
//     if (process.argv[2] == "spotify-this-song" && search == "") {
//         search = "The Sign";
//         console.log(search);
//     }
//     if (process.argv[2] == "movie-this" && search == "") {
//         search = "Mr Nobody";
//         console.log(search);
//     }
// }