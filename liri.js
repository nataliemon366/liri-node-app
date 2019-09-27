// name my variables
// require("dotenv").config();
// var keys = require('./keys.js'); //necessary for the app to work
var axios = require("axios"); //will fetch api request
var moment = require("moment");
var command = process.argv[2];
var searchInput = process.argv.splice(3).join(" ");
var fs = require("fs");

if (command === "concert-this") {
    concert(searchInput);
} else if (command === "spotify-this-song") {
    spotifySong(reference);
} else if (command === "movie-this") {
    movie(reference);
} else if (command === "do-what-it-says") {
    doThat();
} else {
    console.log("Please use the right command");
}

function concert(referenceBand) {
    var bandUrl =
        "https://rest.bandsintown.com/artists/" +
        referenceBand +
        "/events?app_id=codingbootcamp";
    console.log(bandUrl);

    axios
        .get(bandUrl)
        .then(function (response) {
            console.log(
                "**********GENERATING***BAND***INFO: " + referenceBand + " *******"
            );
            for (var i = 0; i < response.data.length; i++) {
                var dateTime = response.data[i].datetime; //saves date/time response into a variable
                var dateArr = dateTime.split("T"); //splits the date and the time in the response

                var concertResults =
                    "-------------------------------------------------" +
                    "\nVenue Name: " +
                    response.data[i].venue.name +
                    "\nVenue location: " +
                    response.data[i].venue.city +
                    "\nDate of event: " +
                    moment(dateArr[0], "YYYY-MM-DD").format("MM/DD/YYYY"); //moment(dateArr[0] CREATING A FUNTION TAKING MOMENT AKA TIME AND TAKING THE DATEARR[0]
                //changes to new format
                console.log(concertResults);
            }
            console.log("*************************************************"); //make space and display this on users side
        })
        .catch(function (error) {
            console.log("This is the error: " + error); // will detect any wrong inputs from the user & prompt
        });
}
// Fetch Spotify Keys
var spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
var getArtistNames = function (artist) {
    return artist.name;
};

// Function for running a Spotify search - Command is spotify-this-song
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "The Sign";
    }

    spotify.search({
            type: "track",
            query: userCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

//OMDB Movie - command: movie-this
function getMovie() {
    //argv[2] chooses users actions; argv[3] is input parameter, ie; movie title
    var secondCommand = process.argv[3];
    // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
    var movieName = secondCommand;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            logOutput('================ Movie Info ================');
            logOutput("Title: " + body.Title);
            logOutput("Release Year: " + body.Year);
            logOutput("IMdB Rating: " + body.imdbRating);
            logOutput("Country: " + body.Country);
            logOutput("Language: " + body.Language);
            logOutput("Plot: " + body.Plot);
            logOutput("Actors: " + body.Actors);
            logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
            logOutput('==================THE END=================');

        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (movieName === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        data = data.split(",");
        var action = data[0]
        var value = data[1]
        // getSongs(value)
        switch (action) {
            case "concert-this":
                getBands(value)
                break;
            case "spotify-this-song":
                getSongs(value)
                break;
            case "movie-this":
                getMovies(value)
                break;
            default:
                break;
        }
    });
}
//Call mySwitch function
mySwitch(command);