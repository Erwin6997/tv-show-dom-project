//You can edit ALL of the code here
// level 100: function to show the all the episode :
let listMoves;
function setup() {
  listMoves = getAllShows();
  makeMovesSelect(listMoves);
  showAllMoves(listMoves);
  showMovesToEpisodeSelectList();
};
const rootElem = document.getElementById("root");
let searchContain = document.getElementById("search-container");
let searchDisplay = document.getElementById("display-search");
let nameMoves = document.getElementById("moves-Dropdown-list");
let url = "https://api.tvmaze.com/shows/show-id/episodes";
let episodes;



//show all the moves in first :
function showAllMoves(){
  removeScreen();
  document.getElementById("root").style.display ="block";
  listMoves.forEach((episode)=>{
   rootElem.innerHTML += ` 
    <form id="${episode.id}" class="show-all-moves"> 
      <div id="name-show">
        <h3>${episode.name}</></h3>
      </div>
      <div id="image-show"><a href="${episode.image.original}">
        <img class="image-show" src=${episode.image.medium}></a>
      </div>
      <div class = " all-infoo">  
        <p><strong>Type: </strong>${episode.type}</p>
        <p><strong>language: </strong>>${episode.language}</p>
        <p><strong>Genre: </strong> <a href="https://ww.123moviesfree.ws/genre/${episode.genres}/">${episode.genres}</a></p>
        <p><strong>premiered: </strong>${episode.premiered}</p>
        <p><strong>officialSite: </strong>${episode.officialSite}</p>
        <p><strong>schedule: </strong>Time:${episode.schedule.time},days:${episode.schedule.days}</a></p>
        <p><strong>Network Name: </strong>${episode.network.name}</a></p>
        <p><strong>Country: </strong> ${episode.network.country.name}</a></p>
      </div> 
      <div class="summary-All">
      <p >${episode.summary}</p>
    </div>
   </form>`
  });
  let nameShowAlL = document.getElementById("name-show"); // name the film for select :
  nameShowAlL.addEventListener("click", () => {
    nameMoves.value = nameShowAlL.innerText;
    makePageForEpisodes(nameShowAlL.innerText);
  });
}


function makeMovesSelect(listMoves){
  listMoves.sort((a, b) => (a.name > b.name ? 1 : -1));
  listMoves.forEach((moves) => {
    let optionMoves = document.createElement("option");
    optionMoves.value= moves.id;
    optionMoves.innerHTML = `${moves.name}`;
    nameMoves.appendChild(optionMoves);
  });
  
}

function makePageForEpisodes() {
  if (nameMoves.value == 00 ){
    showAllMoves();
  } 
  removeScreen();
  removeAllShow();
  document.getElementById("root").style.display ="grid";
  episodes.forEach((episode)=>{
    rootElem.innerHTML += `
    <div id="${episode.id}"class="episode-all">
      <p class="episode-title">${episode.name} - S${episode.season.toString()
        .padStart(2, "0")} E${episode.number.toString()
          .padStart(2, "0")}</p>
      <img class="image-episode" src=${episode.image.medium}>
      ${episode.summary}
    </div>`    
  });  
}
//  level 200 : function shod the search bar :
//search box for search characters in all episode :

function searchEpisode() {
  let counter = 0;
  let lowCase = searchContain.value.toLowerCase();
  let allEpisodeSearch = document.getElementsByClassName("episode-all")
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
   `${counter} / ${allEpisodeSearch.length} episodes`;
}

// level 300 start to make select with all episode and E00N00:
let episodeID = document.getElementById("episode-Dropdown-list");
function selectListEpisode (episodes){
  removeEpisodeList();
  episodes.forEach((episode) => {
    let optionEpisode = document.createElement("option");
    optionEpisode.className = "Show-episode";
    optionEpisode.value= episode.id;
    optionEpisode.innerHTML = `S${episode.season.toString()
      .padStart(2, "0")}E${episode.number.toString()
        .padStart(2, "0")} - ${episode.name}`;
        episodeID.appendChild(optionEpisode);
  });
   showEpisodeDesktop();
}

episodeID.addEventListener('change', showEpisodeDesktop );
// show episode when we select episode from select drape:
function showEpisodeDesktop(){
  if (episodeID.value == 00 ){
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
      }  if (episodeID.value === "first"){makePageForEpisodes();}
    });
   searchDisplay.innerText =`1/${episodeID.length -1}`;
}


// start level 400 and add petch() :

// fetch :



function FetchFunction(episodeUrl) {
  fetch(episodeUrl)
  .then(function (response) {
    return response.json()
  })
    .then((data) => {
      episodes = data;
      makePageForEpisodes();
      selectListEpisode(data);
      searchEpisode();
      
    })
    .catch((error) => console.log(error));
}




nameMoves.addEventListener("change", showMovesToEpisodeSelectList);
function showMovesToEpisodeSelectList(){
  let episodeSelect = nameMoves.value;
  let urlNew = url.replace("show-id", episodeSelect);
  FetchFunction(urlNew);
}


//end fetch

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