# CRUD med AJAX

Nu ska vi försöka applicera gårdagens teori och exempel med hjälp av JavaScript. Sättet vi ska göra det är med `AJAX` (Asynchronous JavaScript And XML). Namnet och själva APIt säger att APIt ska användas med XML men det används i de flesta fall med `JSON`. **Ni får jobba tillsammans med övningen**.

__Målet__ med övningen är inte att skriva den bästa JavaScriptkoden utan få en tydligare inblick i hur HTTP-protokollets olika metoder implementeras rent praktiskt.

## Först måste vi ha en server

För att kunna göra detta måste vi ha en lokal server på vår dator för att undvika eventuella [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)-problem. Detta gör man enklast med `MAMP`. Programmet sätter upp allting som man behöver ha för att köra en lokal server. Sedan behöver man bara lägga in ens filer i en speciell mapp så serveras de automatiskt. **Detta verktyg ska även användas i terminens sista kurs så det är bra att ni lär er hur det fungerar**. Om man redan har en localhost uppe på annat sätt behöver man inte använda MAMP.

##### [MAMP Downloads] (https://www.mamp.info/en/downloads/)

För att ändra varifrån du serverar dina filer med _MAMP_ kan du i programmet gå till `Preferences > Web Server > Document Root:` sedan klicka på den lilla mappen: . Sedan kan du välja var du har dina webbprojekt.
![Preferences](https://i.imgur.com/OTmB74J.png)

Sedan ska det bara vara att starta programmet, trycka på start och surfa in på: `localhost:8888`.


### XMLHttpRequest

Vi ska börja med metoden `XMLHttpRequest` som är nativ till JavaScript, metoden är en del av ECMAScript-standarden och har varit det under en längre tid. Det är en ganska virrig och ful metod men den är grunden till det mesta när det kommer till att hämta och skicka data via JavaScript och det ser ut så här:

```javascript

var ajaxRequest = new XMLHttpRequest();

  //When the request is successfull (200 OK) we can log the data
  //When the request is sent we must listen to changes in the 
  //response using 'onreadystatechange'. The final state is 4,
  //that's when the response hase come back. then we can do something
  //with the data, in this case log it.
  ajaxRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      console.log(ajaxRequest.responseText);
    }
  };

  //Open the request by calling the function 'open' on the object
  //The method is 'GET' and the URL is the same ass before
  ajaxRequest.open('GET', 'http://fend16.azurewebsites.net/albums', true);
   //send the request by using the function 'send' on the object
  ajaxRequest.send();
```


## Övningar

Skapa en ny mapp som innehåller `index.html`, `main.js` och en `main.css` eller så återanvänder du filerna i detta repo.

### Övning 1

* Implementera en funktion som hämtar alla album via Web APIt med hjälp av `XMLHttpRequest` som visat ovan och i `main.js` och `console.logga` resultatet: [fend16.azurewebsites.net/albums](fend16.azurewebsites.net/albums)
* Implementera en funktion som hämtar ett enstaka album från Web APIt med `XMLHttpRequest` och `console.logga` det.

### Övning 2

* I `main.js` finns 4 funktioner men två av dem är inte implementerade: `deleteAlbumInDatabase` samt `patchAlbumInDatabase`. Du ska skriva koden till dessa två funktioner. Funktionerna ska göra precis som deras namn antyder, den ena ska använda `DELETE`-metoden i HTTP-protokollet för att ta bort ett album. Den andra ska använda `PATCH`-metoden i HTTP-protokollet för att uppdatera ett album.

### Övning 3

Istället för att enbart `console.logga` resultatet kan vi såklart använda det och visa upp det på sidan. Det vi får tillbaka från våra `XMLHttpRequest` är `JSON` och `JSON` är bara ett mer strukturerat javascript-objekt som vi kan manipulera med JavaScript.

* **Du ska få informationen hämtad från dessa förfrågningar att visas upp i din `index.html` på något sätt. Förslagsvis i en lista.**

## Länkar

* [w3Schools | AJAX Tutorial](http://www.w3schools.com/xml/ajax_intro.asp)
* [MDN | AJAX TUTORIAL](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)
