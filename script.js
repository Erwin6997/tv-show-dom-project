//You can edit ALL of the code here
// level 100: function to show the all the episode :
//start :
let listMoves;
function setup() {
  listMoves = getAllShows();
  firstPage(listMoves);
  //makeMovesSelect(listMoves);
  // showAllMoves();
  searchEpisode();
  //showMovesToEpisodeSelectList(listMoves);
};

const rootElem = document.getElementById("root");
let searchContain = document.getElementById("search-container");
let searchDisplay = document.getElementById("display-search");
let nameMoves = document.getElementById("moves-Dropdown-list");
let searchBox = document.getElementById("search-box");
let titleClick;
let url ="https://api.tvmaze.com/shows/show-id/episodes";
let urlName = "https://api.tvmaze.com/shows/*?embed=cast";
let episodes;
let control;

//0.1 first page :
function firstPage(listMoves){
  control = 1
  searchContain.style.display = "none";
  searchDisplay.style.display = "none";
  nameMoves.style.display = "none";
  episodeID.style.display = "none";
  // slide show :
  listMoves = getAllShows();
  listMoves.sort((a, b) => (a.name > b.name ? 1 : -1));
  let slideShow = document.createElement("div");
  slideShow.classList.add("container")
  searchBox.appendChild(slideShow);
  
  let slideShowD = document.createElement("div");
  slideShowD.classList.add("slideShowD")
  slideShow.appendChild(slideShowD);
  
  listMoves.forEach((image) => {
    let imageSlide = document.createElement("img");
    imageSlide.classList.add("imageS"); 
    slideShowD.appendChild(imageSlide);
    imageSlide.src = image.image.medium;
  });
    // counter
    let imgAll = document.querySelectorAll(".slideShowD .imageS");
    let counter = 1; 

    let size = imgAll[0].clientWidth;
    //console.log("sixe:" +size);
    function replay(){
    //  console.log("counter : "+ counter);
      slideShowD.style.transition = "transform 4s ease-in-out";
      slideShowD.style.transform = 'translateX(' + (-size + counter) + 'px)';
     // console.log(+ (-size + counter));
      counter ++;
    };
 setInterval(replay, 300);

 //
let ep = 0;
  const rootFirstPage = document.createElement("div");
  rootElem.appendChild(rootFirstPage);
  rootFirstPage.classList.add('root-first-page')
  listMoves = getAllShows();
  listMoves.forEach((moves) => {
    ep ++;
     rootFirstPage1 = document.createElement("div");
    const rootSpamFirst1 = document.createElement("samp");
    const rootImageFirstPage = document.createElement("img");
    //const rootSpamFirst2 = document.createElement("samp");
    const rootH1First = document.createElement("h1");

    rootFirstPage.appendChild(rootFirstPage1);
    rootFirstPage1.appendChild(rootSpamFirst1);
    rootFirstPage1.appendChild(rootImageFirstPage);
    //rootFirstPage1.appendChild(rootSpamFirst2);
    rootFirstPage1.appendChild(rootH1First);

    //rootSpamFirst1.textContent = moves.name;
    rootImageFirstPage.src = moves.image.medium;
    rootH1First.textContent = moves.name
    
    rootImageFirstPage.classList.add("image-first-page");
    rootFirstPage1.classList.add("root-first");
    rootH1First.classList.add("overlay");
    rootSpamFirst1.classList.add(ep);
    rootFirstPage1.addEventListener("click", function(){
      control = 0;
      slideShow.style.display = "none";
      makeMovesSelect(moves.id);
     //showAllMoves(moves.id);
    });
  });
  
}

// 2. show all the moves in first page: control = 0
function showAllMoves(id){
  if (control === 0 ){
    //console.log("id film :" + id );
      z = -1 ;
    removeScreen();
    document.getElementById("root").style.display ="block";

    listMoves.forEach((episode)=>{
      z++;
     // console.log(z , episode.id);
      if (id === episode.id){
      rootElem.innerHTML = ` 
       <form id="${episode.id}" class="show-all-moves"> 
          <span id="tittle-Click" onclick="buttonF(${z})">${episode.name}</span>
          <div id="image-show"><a href="${episode.image.original}">
            <img class="image-show" src=${episode.image.medium}></a>
          </div>
          <div class = "all-infoo">  
            <p><strong>Type: </strong>${episode.type}</p>
            <p><strong>language: </strong>${episode.language}</p>
            <p><strong>Genre: </strong> <a href="https://ww.123moviesfree.ws/genre/${episode.genres}/">${episode.genres}</a></p>
            <p><strong>premiered: </strong>${episode.premiered}</p>
            <p><strong>officialSite: </strong> <a href="${episode.officialSite}"> TV Show</a></p>
            <p><strong>schedule: </strong>Time:${episode.schedule.time},days:${episode.schedule.days}</p>
            <p><strong>Network Name: </strong>${episode.network.name}</p>
            <p><strong>Country: </strong> ${episode.network.country.name}</p>
          </div> 
          <div class="summary-All">
            <p >${episode.summary}</p>
          </div>
          <h3 id="castF">       Cast :</h3>
        </form>
        `;

        // first fetch for asters:
       let castF = document.getElementById("castF");
       let urlNewFirst = urlName.replace("*", id);
       //console.log( urlNewFirst);
       fetch(urlNewFirst)
       .then(function (response) {return response.json()})
       .then((data) => {cast(data) })
       .catch((error) => console.log(error))
        function cast(data) {
          // let character = document.createElement("form");
          //    character.classList.add("character");
            // castF.appendChild(character);
          for (let i = 0 ; i <= data._embedded.cast.length ; i ++){
            rootElem.innerHTML += `
            <form id="character" class="character">
              <div id="image-showS"><a href="${data._embedded.cast[i].person.image.original}">
                <img class="image-show" src=${data._embedded.cast[i].person.image.medium}></a>
                <div id="as" class="as">
                  <p><a href="${data._embedded.cast[i].person.url}"> ${data._embedded.cast[i].person.name}</a></p>
                  <p><strong>as: </strong> <a href="${data._embedded.cast[i].character.url}"> ${data._embedded.cast[i].character.name}</a></p>
                </div>
                </div>
              </form>`
          };
          let character = document.querySelectorAll("#character");
        
        }
      }
    });
  }    
 // makeMovesSelect(name);
}

//1. make show drop selector --All Moves-- control = 0
function makeMovesSelect(id){
  if (control === 0 ){
    document.getElementById("root").style.display ="block";
   // searchContain.style.display = "grid";
   // searchDisplay.style.display = "grid";
   // nameMoves.style.display = "grid";
    //episodeID.style.display = "grid";
    //listMoves.sort((a, b) => (a.name > b.name ? 1 : -1));
    listMoves.forEach((moves) => {
      let optionMoves = document.createElement("option");
      optionMoves.value= moves.id;
      optionMoves.selectedIndex = moves.id;
      optionMoves.innerHTML = `${moves.name}`;
      nameMoves.appendChild(optionMoves);

  });
  /*
    if ( 18 >= id < 37){ nameMoves.selectedIndex = id + 1 };
    if (id >= 37  && id < 86){ nameMoves.selectedIndex = id + 2 };
    if (id >= 86  && id < 114){ nameMoves.selectedIndex = id + 3 };
    if (id >= 114  && id < 120){ nameMoves.selectedIndex = id + 4 };
    if (id >= 120  && id < 122){ nameMoves.selectedIndex = id + 5 };
    if (id >= 122  && id < 136){ nameMoves.selectedIndex = id + 6 };
    if (id >= 136  && id < 174){ nameMoves.selectedIndex = id + 7 };
    if (id >= 174  && id < 224){ nameMoves.selectedIndex = id + 8 };
    if (id >= 224 ){ nameMoves.selectedIndex = id + 9 };*/
      showAllMoves(id);
}
}

// 3. if you select the title of the move send you to fetch:
 function buttonF(value){
 
   nameMoves.selectedIndex = value;
    showMovesToEpisodeSelectList();
}

//4. select episode for send url to fetch
nameMoves.addEventListener("change", function(){
  let id = nameMoves.value;
  console.log("id darone dowomi :"+ id);
  showAllMoves(id);
});

function showMovesToEpisodeSelectList(){
  if (nameMoves.value === "-- All Moves --"){console.log(" alll moves shod :"); return showAllMoves();}
  else{
  let episodeSelect = nameMoves.value;
  let urlNew = url.replace("show-id", episodeSelect);
  let urlForAct = url.replace("show-id/episodes", episodeSelect);
  //console.log("sgshgd"+ urlForAct);
  FetchFunction(urlNew);
  }
}
// start level 400 and add fetch() :
//5. fetch :
function FetchFunction(episodeUrl) {
  fetch(episodeUrl)
  .then(function (response) {
    return response.json()
  })
  .then((data) => {
    episodes = data;
    makePageForEpisodes();
    selectListEpisode();
    searchEpisode();
  })
  .catch((error) => console.log(error));
}
//end fetch

//6.show the episode which is come form the fetch:
function makePageForEpisodes() {
  if (nameMoves.value === "-- All Moves --" ){console.log(" alll moves shod :"); return showAllMoves();} 
  removeScreen();
  removeAllShow();
  removeCharacter();
  removeEpisodeList();
    searchContain.style.display = "grid";
   searchDisplay.style.display = "grid";
   nameMoves.style.display = "grid";
    episodeID.style.display = "grid";
  document.getElementById("root").style.display ="grid";
  //document.getElementById("root").style.grid.template= "auto, auto, auto, auto";
  Array.from(episodes).forEach((episode)=>{
    rootElem.innerHTML += `
    <div id="${episode.name}"class="episode-all">
      <p class="episode-title">${episode.name} - S${episode.season.toString()
        .padStart(2, "0")} E${episode.number.toString()
          .padStart(2, "0")}</p>
      <img class="image-episode" src=${episode.image.medium}>
      ${episode.summary}
    </div>`    
  });  
}

// 7. show le episode list on select drupe list:
// level 300 start to make select with all episode and E00N00:
let episodeID = document.getElementById("episode-Dropdown-list");
function selectListEpisode (){
  removeEpisodeList();
  Array.from(episodes).forEach((episode) => {
    let optionEpisode = document.createElement("option");
    optionEpisode.className = "Show-episode";
    optionEpisode.value= episode.id;
    optionEpisode.innerHTML = `S${episode.season.toString()
      .padStart(2, "0")}E${episode.number.toString()
        .padStart(2, "0")} - ${episode.name}`;
        episodeID.appendChild(optionEpisode);
  });
}

// 8, make display for all the episode :
episodeID.addEventListener('change', showEpisodeDesktop );
// show episode when we select episode from select drape:
function showEpisodeDesktop(){
  if (episodeID.value === "-- All Episodes --" ){
    makePageForEpisodes();
  }Array.from(episodes).forEach((episode) => { 
     if (episode.id == episodeID.value ){
        removeScreen();
        rootElem.innerHTML += `
          <div id="${episode.id}"class="episode-all">
          <p class="episode-title">${episode.name} - S${episode.season.toString()
          .padStart(2, "0")} E${episode.number.toString()
          .padStart(2, "0")}</p>
          ${episode.summary}
          <img class="image-episode" src=${episode.image.medium}>
        </div>`;
      }
    });
   searchDisplay.innerText =`1/${episodeID.length -1}`;
}


//  level 200 : function shod the search bar :
//search box for search characters in all episode :

function searchEpisode() {
  if (nameMoves.value === "-- All Moves --"){
    let allEpisodeSearch = document.getElementsByClassName("show-all-moves");
    let counter = 0;
    let lowCase = searchContain.value.toLowerCase();
    Array.from(allEpisodeSearch).forEach((episode) => {
      let episodeCharacter = episode.innerText.toLowerCase();
      if (episodeCharacter.indexOf(lowCase) != -1) {
        episode.style.display = "block";
        counter += 1;
      } else {
         episode.style.display = "none";
      }
    });
    searchContain.addEventListener("input", searchEpisode);
    searchDisplay.innerText =
     `${counter} / ${allEpisodeSearch.length} Moves`;
  }else{
    let allEpisodeSearch = document.getElementsByClassName("episode-all")
    let counter = 0;
  let lowCase = searchContain.value.toLowerCase();
  Array.from(allEpisodeSearch).forEach((episode) => {
    let episodeCharacter = episode.innerText.toLowerCase();
    if (episodeCharacter.indexOf(lowCase) != -1) {
      episode.style.display = "block";
      counter += 1;
    } else {
       episode.style.display = "none";
    }
  });
  searchContain.addEventListener("input", searchEpisode);
  searchDisplay.innerText =
   `${counter} / ${allEpisodeSearch.length} Episodes`;
  }
}

function removeAllRoot(){
  let selectShowScreen = document.getElementsByClassName("search-box");// 
  Array.from(selectShowScreen).forEach((opt) => opt.remove());
}
function removeCharacter(){
  let selectShowScreen = document.getElementsByClassName("character");// 
  Array.from(selectShowScreen).forEach((opt) => opt.remove());
}
// screen remove for all moves :
function removeAllShow(){
  let selectShowScreen = document.getElementsByClassName("show-all-moves");
  Array.from(selectShowScreen).forEach((opt) => opt.remove());
}

// screen remover for change screen :
function removeScreen(){
  let selectEpisodeOptions = document.getElementsByClassName("episode-all");
  Array.from(selectEpisodeOptions).forEach((opt) => opt.remove());
}
function removeEpisodeList(){
  let selectEpisodeList = document.getElementsByClassName("Show-episode");
  Array.from(selectEpisodeList).forEach((opt) => opt.remove());
}

//link to TvMaze
const Time = document.createElement("p");
Time.className = "TimeZone";
document.body.appendChild(Time);
setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  Time.innerHTML = t;
}
//
let linkTvMaze = document.createElement("a");
linkTvMaze.href = "https://www.tvmaze.com/";
linkTvMaze.innerText = "Tv Maze";
linkTvMaze.className = "link-Tv-Maze";
linkTvMaze.target = "_blank";
document.body.appendChild(linkTvMaze);

 

///

window.onload = setup;
/*
     this is the first Idea but i check innerHTML i got it how can put everything inside them :

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  
  for(let i = 0 ; i < episodeList.length ; ++i){
    console.log(episodeList.length);
    
    // create three element Title , Image , Info :
    const rootDiv = document.createElement("div");
    const rootTitle = document.createElement("p");
    const rootImage = document.createElement("img");
    const rootP = document.createElement("p");
    const rootBr = document.createElement("br");


   // show the element :
    rootTitle.textContent = `${episodeList[i].name} - S0${episodeList[i].season} E0${episodeList[i].number}`;
    rootImage.src = `${episodeList[i].image.medium}`; 
    rootP.innerHTML = `${episodeList[i].summary}`;
    //rootBR.innerHTML = ` `;

    // appendChild to the div : 
    rootElem.appendChild(rootDiv);
    rootDiv.appendChild(rootTitle);
    rootDiv.appendChild(rootImage);
    rootDiv.appendChild(rootP);
    rootDiv.appendChild(rootBr);

    // create class for element :
    rootDiv.classList.add("container")
    rootTitle.classList.add("tittleC");
    rootImage.classList.add("image");
    rootP.classList.add("info");


    console.log("each div :" + i);

  }
};



*/