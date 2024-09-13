/*
//**----- TO DO LIST -----**\\
1. Add sprites
2.
*/

//Base game const setting up canvas and the death screen video
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let video = document.getElementById('myVideo');

//Resizing canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Make the window size readjust to the browser
window.onresize = function () {
  //Canvas is stretched to the browser
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

//MAIN GAME VARS
let score = 0;
let speedHelper = 0;
let gravity = 1.5;
let groundColor = '#0F570D';

//Set the ground height
const GROUND = canvas.height / 1.5;

//Add a player to teh game
let player = new Player(125, 425, 25, 25);

//Make the lists of flies and cacti
let flies = [];
let cacti = [];

//DRAW GROUND
function drawGround() {

  //Fill in the ground with its set color
  ctx.fillStyle = groundColor;
  //Setting the ground width and height
  ctx.fillRect(0, GROUND, canvas.width, canvas.height - GROUND);
}

//Check for the space bar being pressed
document.addEventListener('keydown', event => {
  //If space bar pressed
  if (event.key == ' ') {
    //run the jump function in the player class
    player.jump();
    //console.log(player.jumping);
  }
})

//RANDOM INTEGER
function RandomInt(min, max) {

  //Return a number between the set min and max
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//SPAWN CACTUS
function SpawnFly() {

  //If random number is greater than 5 spawn tiny fly
  if (RandomInt(1, 10) > 5) {
    //Add a new fly to teh list of all of them
    flies.push(new Fly());
  }
}

//SPAWN CACTUS
function SpawnCactus() {

  //If the random number is greater then 3 spawn the big fat cactus
  if (RandomInt(1, 10) > 3) {
    //Add a new cactus to the list of them all
    cacti.push(new Cactus());
  }
}

//Self Explanatory ah function
function showDeathScreen() {
  //Shows death screen
  document.getElementById('deathScreen').style.display = 'inline';
}

//RESPAWN
function respawn() {

  //Make the player.dead var false
  player.dead = false;
  //Get rid of the death screen
  document.getElementById('deathScreen').style.display = 'none';
  //Update the score
  score = 0;
  //Reset flies and cacti lists
  flies = [];
  cacti = [];
  //Run update function to start up the game
  update();
}

//SCORE
function scoreAdd() {

  //If player is not dead
  if (player.dead != true) {
    //Add to the score then up the second score var to later update the speed
    score++;
    speedHelper++;
    //Display the score
    document.getElementById('scoreWhen').innerText = `Your score: ${score}`;
  }
}

//UPDATE GAME
function update() {
  //Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //If player has died then stop the game
  if (player.dead) {
    return;
  }
  //console.log(flies.xv);

  //Load in the player and draw the ground
  player.draw();
  player.update();
  drawGround();
  
  //Console log the list of flies and cacti
  //console.log(cacti);
  //console.log(flies);

  //****ADD SPRITE FOR CACTI HERE****

  //Spawn and update flies on the map
  for (f in flies) {
    let fly = flies[f];
    fly.draw();
    fly.update();
    if (collision(player, fly)) {
      player.dead = true;
    }

    //Delete flies that are off map
    if (fly.x < 0) {
      flies.splice(f, 1);
    }
  }

  //Spawn and update cati on the map
  for (c in cacti) {
    let cactus = cacti[c];
    cactus.draw();
    cactus.update();
    if (collision(player, cactus)) {
      player.dead = true;
    }

    //Delete cacti that are off map
    if (cactus.x < 0) {
      cacti.splice(c, 1);
    }
  }

  //If the player dies then show the death screen
  if (player.dead) {
    showDeathScreen();
  }

  requestAnimationFrame(update);
}

//Run the update function and set the spawns and score to activate at said times
update();
setInterval(SpawnCactus, 1000);
setInterval(SpawnFly, 1500);
setInterval(scoreAdd, 100)