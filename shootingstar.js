// declare any letiables you need here.
// let x, y, etc..
// you will see setup and draw is not definied or used warnings and other warnings in your console at the bottom right. This is a glitch in how codesandbox loads the libraries and methods from p5. All is well.
//
// Basic idea for this animation inspired by the "Project: Shooting Star" section of "Animation Basics"
// in the "Intro to JS: Drawing & Animation" course on Khan Academy.
// All further changes are my own, with some suggestions, tweaking/inspiration,
// and trouble-shooting supplied by Google, my previous projects with Code Tenderloin, and my partner.

const canvasWidth = 500;
const canvasHeight = 500;
let xPos = 0;
let yPos = 0;
let starSize = 5;
let boomSize = 1;
let boomSize2 = 1;
let randomizedCity = buildSkyline(10);
let randomizedCity2 = buildSkyline(5);

function setup() {
  // create your canvas and define size here it's set to 500 x 500px you can also set any static shapes that won't need to be drawn here.
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(29, 40, 115);

  noStroke();
  fill(15, 15, 15);
  skyline(0, canvasHeight, randomizedCity2);

  strokeWeight(starSize - 1.75);
  stroke(255, 255, 255);
  line(0, 0, xPos, yPos);

  noStroke();
  fill(255, 242, 0);
  ellipse(xPos, yPos, starSize, starSize);

  xPos += 4;
  yPos += 4;
  starSize /= 994 / 1000;

  if (yPos === canvasHeight + 192) {
    background(255, 255, 255);
  }

  if (yPos > canvasHeight + 30) {
    noStroke();
    fill(255, 255, 255);
    ellipse(xPos, yPos, boomSize, boomSize);
    boomSize /= 44 / 50;
  }

  fill(0, 0, 0);
  skyline(0, canvasHeight, randomizedCity);

  if (yPos > canvasHeight + 90) {
    noStroke();
    fill(255, 255, 255);
    ellipse(xPos, yPos, boomSize2, boomSize2);
    boomSize2 /= 43 / 50;
  }

  if (yPos > canvasHeight + 400) {
    restartAnimation();
  }
}

// write functions here that are called in your setup or draw function.
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildSkyline(buildingCount) {
  let city = [];
  for (let skyline = 0; skyline < buildingCount; skyline++) {
    let rectHeight = randomInt(20, Math.floor((canvasHeight * 4) / 5));
    let rectWidth = randomInt(20, Math.floor(canvasWidth / buildingCount));
    let building = [rectHeight, rectWidth];
    city.push(building);
  }
  return city;
}

function skyline(x, y, randomizedCity) {
  for (let building = 0; building < randomizedCity.length; building++) {
    rect(
      x,
      y - randomizedCity[building][0],
      randomizedCity[building][1],
      randomizedCity[building][0]
    );
    x += randomizedCity[building][1];
  }
}

function restartAnimation() {
  xPos = 0;
  yPos = 0;
  starSize = 5;
  boomSize = 1;
  boomSize2 = 1;
  randomizedCity = buildSkyline(5);
  randomizedCity2 = buildSkyline(10);
}
