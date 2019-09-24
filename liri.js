// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);


// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

var command = process.argv[2]
var searchInput = process.argv.splice(3).join(' ')

if (command === 'concert-this') {
    console.log(command)
} else if (command === "spotify-this-song") {
    console.log(command)
} else if (command === "movie-this") {
    console.log(command)
} else if (command === "do-what-it-says") {
    console.log(command)
} else {
    console.log("Please use the right command")
}