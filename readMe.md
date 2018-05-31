LIRI_NODE_APP

Liri is a standalone app developed using node.js. Liri takes on user inputs and get the data from twitter, spotify and IMDB websites. Before you run the app, please install node packages of twitter, node-spotify-api and dotenv in your local computer directory.  “.env” file loads the environment variables in the machine, which is accessed by keys.js. Update your api keys for twitter and spotify in the keys.js file. User has multiple options to get the information. User can input 
* “my-tweets”, 
* “spotify-this-song” <song name>, 
* “movie-this” <movies name> or 
* “do-what-it-says”
When user input is “my-tweets” he/she can get all the latest tweets from the account mentioned in liri.js. You can update to your own twitter account. The keys to access the APIs are read from keys.js and a call is made to Twitter website for data. When the user input is incorrect, a log file is generated and error is logged in the file with a timestamp. An error will be displayed on the console as well.
When user input is “spotify-this-song”, liri will make a call to spotify api and get relevant data back. If the user does not specify the song, it will default to “The Sign”. If the user has entered a song that does not match the search criteria with Spotify, it will log error in the log file and display the error on console to let the user know about it. If the user input has spaces between the song name, liri app function will automatically convert the spaces into “+” to help get the correct song information back from spotify.
When the user input is “movie-this”, we make a call to IMDB website to get movie information and display it to user on console. If the user does not enter the movie, liri will default it to “Mr. Nobody”. When the user enters a movie, which has spaces in between liri will replace the spaces to “+” to make the proper call to IMDB website. If the user enters a movie, that IMDB website does not have any information, error is log the error-log file and display the error to user. 
When the user input is “do-what-it-says”, app reads the random.txt and make api call to spotify to get the information about the song mentioned in the text file. If app are not able to read random.txt, it will log ` error in log file and also display to the user. 
When the user does not input any of the options, liri will display a message to user informing about the different options he/she can choose from. 



