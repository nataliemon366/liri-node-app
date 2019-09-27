
// name my variables 
// require("dotenv").config();
// var keys = require('./keys.js'); //necessary for the app to work
var axios = require('axios') //will fetch api request 
// var Spotify = require('node-spotify-api')
// var spotify = new Spotify(keys.spotify);
var moment = require('moment')
var command = process.argv[2]
var arg = process.argv;
var reference = [];
var referenceBand = process.argv.splice(3).join(' ');
var theSong = ''
var theMovie = ''
var theBand = ''
var searchInput = process.argv.splice(3).join(' ')
// make the commands:
// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
if (command === 'concert-this') {
    //console.log(command)
    concert(referenceBand)
} else if (command === "spotify-this-song") {
    spotifySong(reference)
} else if (command === "movie-this") {
    movie(reference)
} else if (command === "do-what-it-says") {
    doThat();
} else {
    console.log("Please use the right command")
}
//concert-this function
//create the url thats needed for bands in town 
//then make an axious call to that url 
// then handle the returning data 
function concert(referenceBand) {
    var bandUrl = "https://rest.bandsintown.com/artists/" + referenceBand + "/events?app_id=codingbootcamp";
    console.log(bandUrl)

    axios.get(bandUrl).then(
            function (response) {
                console.log(response[0])
                console.log("**********GENERATING***BAND***INFO:  " + referenceBand + "*******");
                // for (var i = 0; i < response.data.length; i++) {

                //     var dateTime = response.data[i].datetime; //saves date/time response into a variable

                //     var dateArr = datetime.split('T'); //splits the date and the time in the response

                //     var concertResults =
                //         "-------------------------------------------------" +
                //         "\nVenue Name: " + response.data[i].venue.name +
                //         "\nVenue location: " + response.data[i].venue.city +
                //         "\nDate of event: " + moment(dateArr[0], "YYYY-DD-MM").format('DD/MM/YYYY'); //moment(dateArr[0] CREATING A FUNTION TAKING MOMENT AKA TIME AND TAKING THE DATEARR[0]
                //     //changes to new format
                //     console.log(concertResults);
                // }
                console.log("     ");
                console.log("*********************************"); //make space and display this on users side
            })
        .catch(function (error) {
            console.log('This is the error: ' + error); // will detect any wrong inputs from the user & prompt 
        });

}

spotify-this-song function
gathers song and artist, album and preview link.....
function spotifySong(reference) { //created a function  called spotify song which will generate a reference to the related song
    if (reference.length === 0) {
        reference = "The Sign";
    }
    spotify
        .search({
            type: 'track',
            query: reference
        })
        .then(function (response) {
                console.log("**********Spotifying**" + reference + "*******");
                for (var i = 0; i < 5; i++) {
                    var spotifyResults =
                        "-----------------------------------------" +
                        "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                        "\nSong Name: " + response.tracks.items[i].name +
                        "\nAlbum Name: " + response.tracks.items[i].album.name +
                        "\nPreview Link: " + response.tracks.items[i].preview_url;

                    console.log(spotifyResults);

                }

            }
        }