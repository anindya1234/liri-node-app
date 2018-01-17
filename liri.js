var request = require("request");
var fs = require("fs");
var liri = require('./keys.js').twitterKeys;
var liriS = require('./keys.js').spotify;
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var data = new twitter(liri);
var dataS = new Spotify(liriS);

// Store all of the arguments in an array
var nodeArgs = [];
nodeArgs = process.argv;
var arg = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    arg = arg + "+" + nodeArgs[i];

  }

  else {

    arg += nodeArgs[i];  

  }
}

//create tweet generator
function getTweet() {
	var params = {screen_name: 'ag50679699'};

	data.get('statuses/user_timeline', params, function(error, tweets, response){
	    if(!error){
	    	if(tweets.length<20) //if number of tweets less than 20 iterate till number of tweets
		    {
		      for(var i = 0; i<tweets.length; i++){
		         console.log(tweets[i].text);      
					fs.appendFile("log.txt", "Tweets: " + tweets[i].text, function(err) {// append tweets in log file
					  if (err) {
					    console.log(err);
					  }
					});  
			    }	
	        }else //if number of tweets > than 20 grab 20 tweets
	        {
		        for(var i = 0; i<20; i++){
			        console.log(tweets[i].text);      
					fs.appendFile("log.txt", "Tweets: " + tweets[i].text, function(err) {// append tweets in log file
					  if (err) {
					    console.log(err);
					  }
					});  
			    }	

	        }
	    
	    }else
	    {
	      console.log(error,"Error occurred");
	    }
	});
}

//call tweet function on input my-tweets
if(nodeArgs[2]==="my-tweets"){
 getTweet();
}

// if 2nd input is movie-this Then run a request to the OMDB API with the movie specified
if(nodeArgs[2]==="movie-this"){
	if (arg==="") //no movie provided in argument
    {	arg="Mr. Nobody";
    	var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=40e9cece";
	    console.log(queryUrl);
   
		request(queryUrl, function(error, response, body) {

		  if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("imdbRating: " + JSON.parse(body).imdbRating);
		    console.log("RottenTomato Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Production Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Actors: " + JSON.parse(body).Actors);
		    console.log("Plot: " + JSON.parse(body).Plot);
		     fs.appendFile("log.txt", "Title: \n" + JSON.parse(body).Title+" "+"Release Year: \n" + JSON.parse(body).Year +" "+"imdbRating: \n" + JSON.parse(body).imdbRating+
			" "+"RottenTomato Rating: \n" + JSON.parse(body).Ratings[1].Value  + " "+ "Production Country: \n " + JSON.parse(body).Country +" "+ "Language: \n" + JSON.parse(body).Language+ " "+"Actors: \n" + JSON.parse(body).Actors+" "+ "Plot: \n" + JSON.parse(body).Plot, function(err) {
			 if (err) {
			    console.log(err);
			  }
			});
		
		  }
		});
	} //movie provided in argument
	else{	
		var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=40e9cece";
	    
   
		request(queryUrl, function(error, response, body) {

		  // If the request is successful
		  if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("imdbRating: " + JSON.parse(body).imdbRating);
		    console.log("RottenTomato Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Production Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Actors: " + JSON.parse(body).Actors);
		    console.log("Plot: " + JSON.parse(body).Plot);
		     fs.appendFile("log.txt", "Title: \n" + JSON.parse(body).Title+" "+"Release Year: \n" + JSON.parse(body).Year +" "+"imdbRating: \n" + JSON.parse(body).imdbRating+
			" "+"RottenTomato Rating: \n" + JSON.parse(body).Ratings[1].Value  + " "+ "Production Country: \n " + JSON.parse(body).Country +" "+ "Language: \n" + JSON.parse(body).Language+ " "+"Actors: \n" + JSON.parse(body).Actors+" "+ "Plot: \n" + JSON.parse(body).Plot, function(err) {			 if (err) {
			    console.log(err);
			  }
			});
		  
		  }
		});
    }
}  

function spotifySong(arg){
	 
	if (arg===""){ 
		dataS.search({ type: 'track', query: 'Ace of base' + '&limit=1&'}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
			console.log("Song's Name: " + JSON.stringify(data.tracks.items[0].name));
			console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name));
			console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
			console.log("Artist's Name: " + JSON.stringify(data.tracks.items[0].album.artists[0].name)); 
            
            fs.appendFile("log.txt", "Song's Name: \n" + JSON.stringify(data.tracks.items[0].name)+" "+"Album Name: \n" + JSON.stringify(data.tracks.items[0].album.name) +
			"Preview Link: \n"  + JSON.stringify(data.tracks.items[0].preview_url) +" "+ "Artist's Name: \n " + JSON.stringify(data.tracks.items[0].album.artists[0].name), function(err) {
			 if (err) {
			    console.log(err);
			  }
			});
		});
    } else{
   	    dataS.search({ type: 'track', query: arg + '&limit=1&'}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
			console.log("Song's Name: "   + JSON.stringify(data.tracks.items[0].name));
			console.log("Album Name: "    + JSON.stringify(data.tracks.items[0].album.name));
			console.log("Preview Link: "  + JSON.stringify(data.tracks.items[0].preview_url));
			console.log("Artist's Name: " + JSON.stringify(data.tracks.items[0].album.artists[0].name)); 
			//append in log file
			fs.appendFile("log.txt", "Song's Name: \n" + JSON.stringify(data.tracks.items[0].name)+" "+"Album Name: \n" + JSON.stringify(data.tracks.items[0].album.name) +
			"Preview Link: \n"  + JSON.stringify(data.tracks.items[0].preview_url) +" "+ "Artist's Name: \n" + JSON.stringify(data.tracks.items[0].album.artists[0].name), function(err) {
			 if (err) {
			    console.log(err);
			  }
			});
		});
   }
}

//call spotify the function with argument from data input from user
if(nodeArgs[2]==="spotify-this-song")
{
	spotifySong(arg);
  
}

if(nodeArgs[2]==="do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data) {//read text file , put the data in array

	    if (error) {
	    return console.log(error);
	  }
	  var dataArr = data.split(",");
	  //call spotify the function with argument from data in random text file
	  spotifySong(dataArr[1]);


	});

}


