//You can edit ALL of the code here
// level 100: function to show the all the episode :
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisode()
};
const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode, index)=>{
    rootElem.innerHTML += `
    <div id="${episode.airdate}"class="episode-all">
      <p class="episode-title">${episode.name} - S0${episode.season} E0${episode.number}</p>
      <img class="image-episode" src=${episode.image.medium}>
      ${episode.summary}
    </div>`    
  });  
}



//  level 200 : function shod the search bar :

let searchContain = document.getElementById("search-container");
let searchDisplay = document.getElementById("display-search");

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
  searchDisplay.innerText = `${counter} / ${allEpisodeSearch.length} episodes`;
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