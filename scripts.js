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
  document.documentElement.style.setProperty("--rowNum", resolution);

  parseInt(boardStyle.getPropertyValue("--colNum"));
  document.documentElement.style.setProperty("--colNum", resolution);
  
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
  e.target.style.backgroundColor = "hsl(34, 57%, 70%)";
}

function erase(e) {
  e.target.style.backgroundColor = '';
}


function color(e) {
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
    let currentB = getComputedStyle(e.target).getPropertyValue("filter");

    let bright = currentB[11];
    let reduceB = "brightness(" + (bright - 0.1) + ')';
    e.target.style.setProperty("filter", reduceB);

}



function clearBoard() {
  squares.forEach(div => div.style.backgroundColor = '');
}


function newGrid() {
  resolution = prompt("Please enter grid resolution", "16");
    if (isNaN(resolution) || resolution == null) {
      return;
    }
    else if (resolution<1 || resolution>80){
      resolution = prompt("Please enter grid resolution between 1 and 80", "50");
    }
    clearBoard();
    createBoard(resolution);
}

 