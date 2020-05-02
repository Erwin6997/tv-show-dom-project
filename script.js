//You can edit ALL of the code here
// level 100: function to show the all the episode :
//start :
let listMoves;
function setup() {
  listMoves = getAllShows();
  makeMovesSelect(listMoves);
  showAllMoves();
  searchEpisode();
  //showMovesToEpisodeSelectList(listMoves);
};

const rootElem = document.getElementById("root");
let searchContain = document.getElementById("search-container");
let searchDisplay = document.getElementById("display-search");
let nameMoves = document.getElementById("moves-Dropdown-list");
let titleClick;
let url = "https://api.tvmaze.com/shows/show-id/episodes";
let episodes;
let s = 1;
let z = 1;



//1. make show drop selector --All Moves--
function makeMovesSelect(listMoves){
  //listMoves.sort((a, b) => (a.name > b.name ? 1 : -1));
  listMoves.forEach((moves) => {
    let optionMoves = document.createElement("option");
   // optionMoves.id = s ++;
    optionMoves.value= moves.id;
    optionMoves.innerHTML = `${moves.name}`;
    nameMoves.appendChild(optionMoves);
  });
}

// 2. show all the moves in first page:
function showAllMoves(){
  removeScreen();
  document.getElementById("root").style.display ="block";
  listMoves.forEach((episode)=>{
    z++;
   rootElem.innerHTML += ` 
    <form id="${episode.id}" class="show-all-moves"> 
      <span id="tittle-Click" onclick="buttonF(${episode.id})">${episode.name}</span>
      <div id="image-show"><a href="${episode.image.original}">
        <img class="image-show" src=${episode.image.medium}></a>
      </div>
      <div class = " all-infoo">  
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
   </form>`
  });
}
// 3. if you select the title of the move send you to fetch:

 function buttonF(value){
   nameMoves.selectedIndex = value;
    showMovesToEpisodeSelectList();
}

//4. select episode for send url to fetch
nameMoves.addEventListener("change", showMovesToEpisodeSelectList);
function showMovesToEpisodeSelectList(){
  if (nameMoves.value === "-- All Moves --"){console.log(" alll moves shod :"); return showAllMoves();}
  else{
  let episodeSelect = nameMoves.value;
  let urlNew = url.replace("show-id", episodeSelect);
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
  document.getElementById("root").style.display ="grid";
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
let linkTvMaze = document.createElement("a");
linkTvMaze.href = "https://www.tvmaze.com/";
linkTvMaze.innerText = "Tv Maze";
linkTvMaze.className = "link-Tv-Maze";
linkTvMaze.target = "_blank";
document.body.appendChild(linkTvMaze);



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