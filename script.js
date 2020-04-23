//You can edit ALL of the code here
// level 100:
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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

window.onload = setup;

//  level 200 :
let searchDiv = document.createElement("div");
let searchText = document.createElement("input");
let searchState = document.createElement("lable");

searchText.type = "text";

rootElem.appendChild(searchDiv);
searchDiv.appendChild(searchText);
searchDiv.appendChild(searchState);

searchText.addEventListener('input',myFunction);

function myFunction(){
  searchState.style.backgroundColor = "red";
  searchState.innerHTML = searchText.value;
};


//link to TvMaze
let linkTvMaze = document.createElement("a");
linkTvMaze.href = "https://www.tvmaze.com/";
linkTvMaze.innerText = "Tv Maze";
linkTvMaze.className = "link-Tv-Maze";
linkTvMaze.target = "_blank";
document.body.appendChild(linkTvMaze);


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






