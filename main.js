/**
 * Get Data from a Web API
 * @return {void}
 */
 var getAlbumsFromAPI = function(){

  //Create a new object that handles the request
  var ajaxRequest = new XMLHttpRequest();

  //When the request is successfull (200 OK) we can log the data
  //When the request is sent we must listen to changes in the 
  //response using 'onreadystatechange'. The final state is 4,
  //that's when the response hase come back. then we can do something
  //with the data, in this case log it.
  ajaxRequest.onreadystatechange = function(){
    if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200){

        //To add our responseText to the html I've created a separate
        //function further down which will handle this. 
        appendAlbumsToList(ajaxRequest.responseText);

        //Pretty print all the  JSON :)
        console.log(JSON.stringify(JSON.parse(ajaxRequest.responseText), null,2));

      }
    };

  //Open the request by calling the function 'open' on the object
  //The method is 'GET' and the URL is the same as before
  ajaxRequest.open('GET', 'http://fend16.azurewebsites.net/albums', true);

   //send the request by using the function 'send' on the object
   ajaxRequest.send();
 };

 getAlbumsFromAPI();



/**
 * Posts an album to the Web API using 'POST'
 * @return {void}
 */
 var postAlbumToAPI = function(){

  //Same as get, we need a ajax object to handle the request
  var ajaxRequest = new XMLHttpRequest();

  //The status code we get back in this case is a 201: Content created.
  //But everything else is the same
  ajaxRequest.onreadystatechange = function() {
    if(ajaxRequest.status == 201 && ajaxRequest.readyState == 4) {
      console.log("%c Successfully posted the album with title and artist 🐱", 'color: lightsalmon');
      console.log(JSON.stringify(JSON.parse(ajaxRequest.responseText),null,2));

    } 
  };

  //The method is now 'POST' when sending data to the server
  ajaxRequest.open("POST", 'http://fend16.azurewebsites.net/albums' , true);

  //But when sending data to the API we must provide a specifik header 🤖
  //to tell the server that it should accept the parameters in a correct format
  ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //When we send the request we supply the parameters as an argument
  //each parameter is separated with an ampersand '&'.
  ajaxRequest.send("title=Rumours&artist=Fleetwood Mac");

};



/**
 * Deletes an album from the Web API using 'DELETE'
 * @return {void} Doesn't have a return type
 */
 var deleteAlbumInDatabase = function(){

  //Create a new object that handles the request
  var ajaxRequest = new XMLHttpRequest();

  //When the request is successfull (200 OK) we can log the data
  //When the request is sent we must listen to changes in the 
  //response using 'onreadystatechange'. The final state is 4,
  //that's when the response hase come back. then we can do something
  //with the data, in this case log it.
  ajaxRequest.onreadystatechange = function(){
    if (ajaxRequest.readyState == 4){
      if (ajaxRequest.status == 200){

        //Logs the response if we delete the album
        console.log('Successfully deleted album')

        //Pretty print the object :) Magic
        console.log(JSON.stringify(JSON.parse(ajaxRequest.responseText),null,2));

      } else if (ajaxRequest.status == 404){

        //Check is album is deleted
        console.log('Album already deleted or not found');
      }
    }
  };

  //Open the request by calling the function 'open' on the object
  //The method we use is 'DELETE' and we have to specify a specific album 
  //with the ID of the album
  ajaxRequest.open('DELETE', 'http://fend16.azurewebsites.net/albums/589107a019146133ac85bd08', true);
   //send the request by using the function 'send' on the object
   ajaxRequest.send();

 };



/**
 * Patches the chosen object with new parameters
 * @return {none} Doesn't have a return type
 */
 var patchAlbumInDatabase = function(){


  //Same as get, we need a ajax object to handle the request
  var ajaxRequest = new XMLHttpRequest();

  //The status code we get back in this case is a 201: Content created.
  //But everything else is the same
  ajaxRequest.onreadystatechange = function() {
    if(ajaxRequest.status == 200 && ajaxRequest.readyState == 4) {

      //Pretty printing 🐱
      console.log("%c Successfully patched the album 🐱", 'color: lightsalmon');
      console.log(JSON.stringify(JSON.parse(ajaxRequest.responseText),null,2));
    } 
  };

  //The method is 'PATCH' when we want to change a property. We must specify a 
  //specific album to change
  ajaxRequest.open("PATCH", 'http://fend16.azurewebsites.net/albums/58919b45f8d34821a81c19ed' , true);

  //But when sending data to the API we must provide a specifik header 🤖
  //to tell the server that it should accept the parameters in a correct format
  ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  //We must supply arguments when we send the request with PATCH, every
  //value we want to change we must supply. Every key and value
  //we don't supply will not get changed
  ajaxRequest.send("title=Rumours&artist=Fleetwood Mac");

};


/**
 * Appends albums to a ul-list
 * @param  {Array} albums array returned from ajax call
 * @return {void}
 */
function appendAlbumsToList(albums){
  
  //Creates a variable to hold all li-elements
  var listItems;

  //We need to parse the response from the ajax call to
  //a standard javascript array
  var parsedAlbums = JSON.parse(albums);
  
  //Create a ul-element to hold all li-items and then
  //append this ul-element to index.html. In this case: <main id="albumList">
  var list = document.createElement('ul');
  document.getElementById('albumList').appendChild(list);

  //Loop through array and create a new li element for each album
  //Just + it to a variabel to save it as a string.
  for (var album of parsedAlbums){
    listItems += "<li>" + album.artist + " - " + album.title + "</li>";
  }

  //Then we can set the HTML of the ul-element to the value of listItems
  //which is now all of our albums, each in a li-element
  list.innerHTML = listItems;
}



/**
 * Gets JSON from the local recipes.json file in the folder
 * @return {void} Doesn't have a return type
 */
 var getDaRecipes = function(){
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      console.log(ajaxRequest.responseText);
    }
  };

  //We can also get a lokal JSON-file and load it. We use the same
  //methods but instead of specifying a URL we just supply the file.
  //It is interpreted the same way
  ajaxRequest.open('GET', 'recipes.json', true);
  ajaxRequest.send();
};






/**
 *  INFO ABOUT READYSTATECHANGE
 * 
 * By defining onreadystatechange before the open method is invoked, 
 * it is able to detect every state change from 0 through 4. 
 * If it is defined after the open method, then only states 1 through 4 
 * will be detected. For this reason, it is generally preferred to 
 * place the onreadystatechange assignment before open().
 * 
 * http://stackoverflow.com/a/17006468
 */