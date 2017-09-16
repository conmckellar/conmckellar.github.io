//activate on pageload
$(document).ready(function() {
//declare variable(s)
var dogArray = ["schipperke", "corgi", "shiba", "pug", "husky", "beagle", "pomeranian", "dalmatian", "saluki", "chihuahua", "poodle", "doberman", "dachshund", "bulldog", "terrier", "mastiff", "wolf", "sheepdog", "pitbull", "rottweiler"];

	//show the .gif images
	function fetchGif(buttonText){
		console.log(buttonText)
		//grab the string's value and insert it into the URL query
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL);
		//using ajax to call the server
		$.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response){
            	console.log(response);

            	var results = response.data;
            	console.log(results);
            		//iterate through all the images retrieved with a for loop
            		for (var i = 0; i < results.length; i++) {
			            // Only taking action if the photo has a rating suitable for all code academy audiences
			            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
			              // Creating a div with the class "item"
			              var gifDiv = $("<div class='item'>");
			              // Storing the result item's rating
			              var rating = results[i].rating;

			              var defaultAnimatedSrc = results[i].images.fixed_height.url;
			              var staticSrc = results[i].images.fixed_height_still.url;
			              // Creating image tag
			              var dogImage = $("<img>");
			              // Creating a paragraph tag with the result item's rating
			              var p = $("<p>").text("Rating: " + rating);
			              //giving the image tag a bunch of attributes to make it easy to manipulate
			              dogImage.attr("src", staticSrc);
			              dogImage.addClass("gif");
			              dogImage.attr("data-state", "still");
			              dogImage.attr("data-still", staticSrc);
			              dogImage.attr("data-animate", defaultAnimatedSrc);
			              // Giving the image tag an src attribute of a proprty pulled off the result item
			              dogImage.attr("src", results[i].images.fixed_height.url);
			              // Appending the paragraph and dogImage we created to the "gifDiv"
			              gifDiv.append(p);
			              gifDiv.append(dogImage);
			              // Prepending the gifDiv to the "#dogs" div in the HTML
			              $("#dogs").prepend(gifDiv);
			            }

			          }
			    //As far as I can tell, this pause/unpause function -almost- works perfectly.
			    //The image loads as data-state "still", but despite this it animates upon loading.
			    //HOWEVER, clicking on an image twice initially will pause it, then unpause it on the next, then pause it, and so on.
            	$(".gif").on("click", function() {
			      var state = $(this).attr("data-state");
			      if (state === "still") {
			        $(this).attr("src", $(this).attr("data-animate"));
			        $(this).attr("data-state", "animate");
			        console.log("TWO")
			      } else {
			        $(this).attr("src", $(this).attr("data-still"));
			        $(this).attr("data-state", "still");
			        console.log("THREE")
			      }
			    });

            })

	}

	//these two functions below add a dog (or anything typed, really) to the dogArray and does create a button for them that works.
	//HOWEVER, it creates a copy of the dogArray with the new button directly underneath the textbox. I have not figured out why that is.
	$("#addDog").on("click", function(event) {
        event.preventDefault();
        var newDog = $("#dog-input").val().trim();
        dogArray.push(newDog);
        console.log(dogArray);
        $("#dog-input").val('');
        displayDogs();
      });

	function displayDogs() {
		$("#dogs").empty();
			for (var i = 0; i < dogArray.length; i++) {
		      var a = $('<button class=subject>');
		      a.attr("id", "show");
		      a.attr("data-search", dogArray[i]);
		      a.text(dogArray[i]);
		      $("#dogs").append(a);
		    }
	}

	//make the buttons, looping through the dogArray to do so
	function buttonFactory() {
		$("#dogButtons").empty();

		for (var i = 0; i < dogArray.length; i++) {
			var buttonTag = $("<button>");
			buttonTag.text(dogArray[i]);
            buttonTag.addClass("subject");
            buttonTag.attr("store-id", dogArray[i]);
            $("#dogButtons").append(buttonTag);
        	console.log("doge")
		}
	}

	//creates all the buttons in the dogArray by calling the function when the page loads
	buttonFactory();

	$(document.body).on("click", ".subject", function(event){
		//cleans off the previous 10 gifs from the page by clearing the "dogs" id after every click
		$("#dogs").empty();
		var buttonText = $(this).text();
		console.log(buttonText);
		fetchGif(buttonText);
	})

	

});