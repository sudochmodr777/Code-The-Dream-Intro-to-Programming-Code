// declare any letiables you need here.
// let x, y, etc..
// you will see setup and draw is not defined or used warnings and other warnings in your console at the bottom right. This is a glitch in how codesandbox loads the libraries and methods from p5. All is well.
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
let starSpeed = 50;
let shockwaveSize = 1;
let shockwaveSize2 = 1;
let randomizedCity = buildSkyline(5);
let randomizedCity2 = buildSkyline(10);

function setup() {
  // create your canvas and define size here it's set to 500 x 500px you can also set any static shapes that won't need to be drawn here.
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  backgroundCity();

  shootingStar();

  impact();

  shockwave();

  restartAnimation();
}

// write functions here that are called in your setup or draw function.
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildSkyline(buildingCount) {
  let city = [];
  for (let blocks = 0; blocks < buildingCount; blocks++) {
    let rectWidth = randomInt(40, Math.floor(canvasWidth / buildingCount));
    let rectHeight = randomInt(40, Math.floor((canvasHeight * 4) / 5));
    let building = [rectWidth, rectHeight];
    city.push(building);
  }
  return city;
}

function skyline(x, y, randomizedCity) {
  for (
    let buildingNumber = 0;
    buildingNumber < randomizedCity.length;
    buildingNumber++
  ) {
    let buildingWidth = randomizedCity[buildingNumber][0];
    let buildingHeight = randomizedCity[buildingNumber][1];
    rect(x, y - buildingHeight, buildingWidth, buildingHeight);
    x += buildingWidth;
  }
}

function backgroundCity() {
  background(29, 40, 115);
  fill(15, 15, 15);
  skyline(0, canvasHeight, randomizedCity);
}

function shootingStar() {
  strokeWeight(starSize - 1.75);
  stroke(255, 255, 255);
  line(0, 0, xPos, yPos);

  noStroke();
  fill(255, 242, 0);
  ellipse(xPos, yPos, starSize, starSize);

  xPos += starSpeed;
  yPos += starSpeed;
  starSize /= 994 / 1000;
}

function impact() {
  if (yPos === Math.round((canvasHeight + 400) / starSpeed) * starSpeed) {
    background(255, 255, 255);
  }
}

function shockwave() {
  if (yPos > canvasHeight + 700) {
    fill(255, 255, 255);
    ellipse(
      canvasWidth + starSize * starSpeed,
      canvasHeight + starSize * starSpeed,
      shockwaveSize,
      shockwaveSize
    );
    shockwaveSize /= 474 / 500;
  }

  fill(0, 0, 0);
  skyline(0, canvasHeight, randomizedCity2);

  if (yPos > canvasHeight + 800) {
    fill(255, 255, 255);
    ellipse(
      canvasWidth + starSize * starSpeed,
      canvasHeight + starSize * starSpeed,
      shockwaveSize2,
      shockwaveSize2
    );
    shockwaveSize2 /= 475 / 500;
  }
}

function restartAnimation() {
  if (yPos > canvasHeight + 15000) {
    xPos = 0;
    yPos = 0;
    starSize = 5;
    shockwaveSize = 1;
    shockwaveSize2 = 1;
    randomizedCity = buildSkyline(5);
    randomizedCity2 = buildSkyline(10);
  }
}
