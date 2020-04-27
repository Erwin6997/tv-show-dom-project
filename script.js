//You can edit ALL of the code here
// level 100: function to show the all the episode :
function setup() {
  const listMoves = getAllShows();
  makeMovesSelect(listMoves);
  showMovesToEpisodeSelectList();
  //const allEpisodes = getAllEpisodes();
  //makePageForEpisodes(allEpisodes);
  //searchEpisode()
  //selectListEpisode(allEpisodes);
};
const rootElem = document.getElementById("root");
let searchContain = document.getElementById("search-container");
let searchDisplay = document.getElementById("display-search");
let nameMoves = document.getElementById("moves-Dropdown-list");
let url = "https://api.tvmaze.com/shows/show-id/episodes";
let episodes;

function makePageForEpisodes(episodeList) {
  removeScreen();
  episodeList.forEach((episode, index)=>{
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

function showEpisodeDesktop(){
   Array.from(episodes).forEach((episode) => { 
      if (episode.id == episodeID.value){
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


// start level 400 and add petch() :

// fetch :

function makeMovesSelect(listMoves){
  listMoves.sort((a, b) => (a.name > b.name ? 1 : -1));
  listMoves.forEach((moves) => {
    let optionMoves = document.createElement("option");
    optionMoves.value= moves.id;
    optionMoves.innerHTML = `${moves.name}`;
    nameMoves.appendChild(optionMoves);
  });
  
}

function FetchFunction(episodeUrl) {
  fetch(episodeUrl)
  .then(function (response) {
    return response.json()
  })
    .then((data) => {
      episodes = data;
      makePageForEpisodes(data);
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