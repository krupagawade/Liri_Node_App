
require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var keys = require('./keys.js')


var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var userArg = process.argv;


switch(userArg[2]){
    case "my-tweets":
        myTwitterTweets();
        break;
    case "spotify-this-song":
        mySpotifySong(formatUserInput(userArg));  
        break;
    case "movie-this":
        myMovieInfo(formatUserInput(userArg));
        break;
    case "do-what-it-says":
        dowhatitsays();
        break;
    default:
        console.log("Please select from following options:");
        console.log("node liri.js <options> <optional arguments>");
        console.log("option are: 'my-tweets' / 'spotify-this-song <song name>' / 'movie-this <movie name>' / 'do-what-it-says'");
      
}


//format user input for spaces to make a request call
function formatUserInput(userInput){
    var input = userInput[3];
    for(var i=4; i<userInput.length; i++){
        input = input + "+" + userInput[i];
    }
    return input;
}

function myTwitterTweets(){
    var params = {screen_name: 'KrupaGawade'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        tweets.forEach(function(element){
            console.log(element.created_at);
            console.log(element.text);
        });
    }
    });
}

function mySpotifySong(userInput)
{
    //check for user input
    if(userInput === null || typeof userInput === 'undefined' || userInput === undefined ){
        userInput = "The+Sign";
    }
    //Make a request to Spotify
    spotify.search({type: 'track', query: userInput})
        .then(function (spotRes) {

            if(spotRes.tracks.items.length === 0){
                console.log("Song not found!");
                writeToFile("Song '" +userInput+ "' not found!");
            }
            else{
                //Store the artist, song, preview link, and album in the results array
                spotRes.tracks.items.forEach(function(ea){
                    console.log("Artist: " +ea.artists[0].name);
                    console.log("Song: " + ea.name);
                    console.log("Preview: "+ ea.external_urls.spotify);
                    console.log("Album: " + ea.album.name);
                    console.log("*************************");
                });
            }
            
        })
        .catch(function (err) {
            console.log("Error");
            console.log(err);
            throw err;
            writeToFile(err);
        });
};
 
function myMovieInfo(userInput){
    var movieURL ="";
    if(userInput === null || userInput === "" ||  typeof userInput === 'undefined' || userInput === undefined ){
        movieURL = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
    } //end of outer if
    else{
        movieURL = "http://www.omdbapi.com/?t="+userInput+"&y=&plot=short&apikey=trilogy"; 
    }

    //get movie details
    request(movieURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            //Check if Movies exists
            var responseJson = JSON.parse(response.body);
                if(responseJson.Response =="True"){
                    // Parse the body of the site and recover just the imdbRating
                    console.log("Title: " + result.Title);
                    console.log("Year of the movie: " + result.Year);
                    console.log("The movie's rating is: " + result.imdbRating);
                    result.Ratings.forEach(function(element){
                        if(element.Source==="Rotten Tomatoes"){
                            console.log("Rotten Tomatoes Rating: " + element.Value);
                        }
                    });
                    console.log("Country: " + result.Country);
                    console.log("Language of the movie: " + result.Language);
                    console.log("Plot of the movie: " + result.Plot);
                    console.log("Actors: " + result.Actors);
                }
                else{
                    console.log(responseJson.Error);
                    writeToFile(responseJson.Error);
                }    
        } //end of if
        else{
            console.log("Error finding the movie");
            writeToFile("Error finding the movies : " + err);
        }
    }); //end of request      
} //end of function

function dowhatitsays(){
    fs.readFile("random.txt","utf8", function(error, data) {
        if(!error){
            var dataArr = data.split(",");
            console.log(dataArr);
            mySpotifySong(dataArr[1]);
        }
    });

}

//Error log function
function writeToFile(errStr){
    var d = new Date();
    var errString = d.getFullYear() + "-"+ formatNumber(d.getMonth()+1) +"-"+ formatNumber(d.getDate()) +" " + formatNumber(d.getHours()) + ":" + formatNumber(d.getMinutes()) + ":" + formatNumber(d.getSeconds()) + " : " + errStr + "\r\n";
    fs.appendFile("log.txt",errString, function(err){
        if(err){
            console.log(err);
        }
    });
}

function formatNumber(num){
    switch(num){
        case 1:
            return "01";
        case 2:
            return "02";
        case 3:
            return "03";
        case 4:
            return "04";
        case 5:
            return "05";
        case 6:
            return "06";
        case 7:
            return "07";
        case 8:
            return "08";
        case 9:
            return "09";
        case 0:
            return "00";
        default:
            return num;
    }

}
