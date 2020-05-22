//script

let squares;
let resolution;
let container = document.querySelector('#container');

function createBoard(resolution) {
  let div;
  let fragment = document.createDocumentFragment();

  for (let i=0; i<resolution; i++){
    for (let j=0; j<resolution; j++) {
      div = document.createElement('div');
      fragment.appendChild(div);
    }
  }
  container.appendChild(fragment);

  let boardStyle = window.getComputedStyle(container);

  parseInt(boardStyle.getPropertyValue("--rowNum"));
  container.style.setProperty("--rowNum", resolution);

  parseInt(boardStyle.getPropertyValue("--colNum"));
  container.style.setProperty("--colNum", resolution);
  
  toggleTool(pen);

};

window.onload = createBoard(30);

function toggleTool(tool) {
  squares = container.querySelectorAll('div');
  squareClass = squares.forEach(div => div.setAttribute("class", "squareColor"));

  squares.forEach(div => div.removeEventListener('mouseover', pen));
  squares.forEach(div => div.removeEventListener('mouseover', erase));
  squares.forEach(div => div.removeEventListener('mouseover', color));
  squares.forEach(div => div.removeEventListener('mouseover', darken));
  
  squares.forEach(div => div.addEventListener('mouseover', tool));
}


function pen(e) {
  getComputedStyle(e.target).getPropertyValue("--brightness");
  e.target.style.setProperty("--brightness", 1);
  
  e.target.style.backgroundColor = "hsl(34, 57%, 70%)";
}

function erase(e) {
  getComputedStyle(e.target).getPropertyValue("--brightness");
  e.target.style.setProperty("--brightness", 1);
  
  e.target.style.backgroundColor = 'white';
}


function color(e) {
  getComputedStyle(e.target).getPropertyValue("--brightness");
  e.target.style.setProperty("--brightness", 1);

  e.target.style.backgroundColor = randomColor();

  function randomColor() {
     return 'hsl(' + random(0,50) + ', ' + random(10,30) + '%, ' + random(60,80) +  '%)';

     // return 'hsl(' + random(250,350) + ', ' + random(10,50) + '%, ' + random(60,80) +  '%)';
     // return 'hsl(' + random(200,270) + ', ' + random(10,40) + '%, ' + random(60,80) +  '%)';
  }
  function random(min,max) {
    let num = Math.floor(Math.random()*(max-min)) + min;
    return num;
  }
}


function darken(e) {
    let currentB = getComputedStyle(e.target).getPropertyValue("--brightness");
    if (currentB>0){
      let bright = currentB - 0.1;
      e.target.style.setProperty("--brightness", bright);
    }
}



function clearBoard() {
  squares.forEach(div => div.style.backgroundColor = 'white');
  squares.forEach(function(div)  {
    getComputedStyle(div).getPropertyValue("brightness");
    div.style.setProperty("--brightness", 1);
  });

}


function newGrid() {
  resolution = prompt("Please enter grid resolution", "30");
    if (isNaN(resolution) || resolution == null) {
      return;
    }
    else if (resolution<1 || resolution>60){
      resolution = prompt("Please enter grid resolution between 1 and 60", "30");
    }
    clearBoard();
    createBoard(resolution);
}

 