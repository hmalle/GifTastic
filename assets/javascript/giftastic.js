
$(document).ready(function(){
  //some necessary variables. 
  var array = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish"];
  var apiKey = "n7gR1cCUPDhe19bxDf9AJafSB2nVPOSl";
  var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
  var response;

  function loadArray(){
    //displays the array of buttons on the screen
    $(".buttonSection").empty();
    for(var a=0; a<array.length; a++){
      var button =$("<button class='gifBtn'>");
      button.attr("data-name", array[a]);
      button.text(array[a]);
      $(".buttonSection").append(button);
    }
  };

  function isPresent(userInput){
  //checks if the new button input is already present in the array.
    if(userInput.length === 0){ return true; } //dont bother adding empty strings.
    for(var a=0;a<array.length; a++){
      if(userInput === array[a]){ return true; }
    } 
    return false;
  }

  function handleResponse(){
    $(".gifSection").empty();
    for(var a=0; a<response.data.length; a++){
      var rspData = $("<div class='rspData'>");
      var rating = $("<p class='rating'>rating: "+ response.data[a].rating+"</p>");
      //TODO:assign multiple data to the gif element
      var gif = $("<img class='rspImg' src='"+response.data[a].images.fixed_height_still.url+"'>");
      var stillImg = response.data[a].images.fixed_height_still.url;
      var movingImg = response.data[a].images.fixed_height.url;
      gif.attr("data-state", "stl");
      gif.attr("data-stl", stillImg);
      gif.attr("data-mov", movingImg);
      rspData.append(rating);
      rspData.append(gif);
      $(".gifSection").append(rspData);
    }
  }

  $(".gifSection").on("click", ".rspImg", function(){
    //when the image is clicked switch the image urls
    if($(this).attr("data-state") === "stl"){
      $(this).attr('src', $(this).attr('data-mov'));
      $(this).attr("data-state","mov");
    }else if( $(this).attr("data-state") === "mov"){
      $(this).attr("src", $(this).attr("data-stl"));
      $(this).attr("data-state", "stl");
    }
  });

  $(".addButton").on("click", function(event){
    //gets the click event and add the user input into the array!!
    event.preventDefault();
    var buttonInput = $(".buttonInput").val().trim(); //trim to remove trailing spaces.
    $(".buttonInput").val("");    //to clear the input text field
    if(!isPresent(buttonInput)){  
      array.push(buttonInput);
    }
    loadArray();
  });

  $(".buttonSection").on("click", ".gifBtn", function(){
    //var pressed = $(this).attr("data-name");
    var queryURL = baseURL+ $(this).attr("data-name")+"&api_key="+apiKey+"&limit=10" ;
    $.ajax({ url: queryURL, method: 'GET' }).done (function(data){
      response = data;
      handleResponse();
    });
  });

  loadArray(); // the funtion to be called when the document is ready.
});
