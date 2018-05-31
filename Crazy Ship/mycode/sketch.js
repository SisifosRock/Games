var ship;
var count;
var stars = [];
var enemies = [];
var enemy_timer = -100; // enemies will be spawn with time

count = 0;

function keyTyped(){
  if (key === 'a') {
    return true;
  }
}

function setup() {
  ship = new Ship();

  for (i = 0; i < 30; i++){
    s = new Stars();
    stars.push(s);
  }
}

function draw() {
  createCanvas(800,600);
  background(10);

  //up level
  if (ship.score >= 100) {
    ship.level = 2; 
  }
  if (ship.score >= 200) {
    ship.level = 3;
  }
  if (ship.score >= 400) {
    ship.level = 4;
  }
  

  //Stars
  for (i = 0; i < stars.length; i++){
    stars[i].display();
    if (stars[i].pos.x < -stars[i].length){
      stars[i] = new Stars();
    }
  }

  //Ship methods
  ship.evolution();
  ship.display();

  //Pause game
  a = keyTyped();
  if(a === true && count > 50){
    count = 0;
    ship.start = !ship.start;
  }

  //Spawn enemies
  if (enemy_timer > 30 && ship.start){
    enemy_timer = 0;
    e = new Enemy();
    e.pos.y = floor(Math.random()*590);
    enemies.push(e);

    if (ship.level >= 2) {
      e2 = new Enemy();
      e2.pos.y = floor(Math.random()*590);
      e2.theme = createVector(158, 66, 244);
      e2.size = 60;
      e2.vel+=2;
      enemies.push(e2);

      if (ship.level >= 3) {
        e3 = new Enemy();
        e3.pos.y = floor(Math.random()*590);
        e3.theme = createVector(244, 226, 65);
        e3.size = 75;
        e3.vel += 3
        enemies.push(e3);

        if (ship.level == 4) {
          e4 = new Enemy();
          e4.pos.y = floor(Math.random()*590);
          e4.theme = createVector(65, 211, 244);
          e4.size = 100;
          e4.vel += 5
          enemies.push(e4);

        }

      }
    }
  }

  if (enemies.length > 0){
    for (i = 0; i < enemies.length; i++){
      enemies[i].display();
      if (ship.start){
        enemies[i].move();
      }
    }
  }

  //Ship moves if it is not paused; else it will show a text indicating that it is paused
  if (ship.start){
    ship.move();
  } else {
    textSize(60);
    textAlign(CENTER);
    fill(245);
    text('PAUSED',200,200);

    noStroke();
    textSize(15);
    fill(200);
    text('(press "a" to continue)', 400,200);
  }

  //Shoot 
  if (mouseIsPressed && ship.start && ship.energy > 300){

    ship.shoot();
    ship.energy -= 6;

    if (enemies.length > 0){
      for (i = 0; i < enemies.length; i++){
        if ((
          (ship.pos.y - ship.size/20 >= enemies[i].pos.y && ship.pos.y - ship.size/20 <= enemies[i].pos.y + enemies[i].size/2)
          || (ship.pos.y + ship.size/20 >= enemies[i].pos.y - enemies[i].size/2 && ship.pos.y + ship.size/20 <= enemies[i].pos.y)
          || (ship.pos.y >= enemies[i].pos.y - enemies[i].size/20 && ship.pos.y <= enemies[i].pos.y + enemies[i].size/20)) 
          && !(ship.pos.x + ship.size <= enemies[i].pos.x - enemies.size/2)){

          enemies.splice(i,1);
          ship.score += 1;
        }
      }
    }
  
  }

  //Bar to  indicate the energy of the ship
  if (ship.energy < 304){
    stroke(255);
    noFill();
    rect(10, 570, ship.energy/3, 12);
  } else {
    noStroke();
    fill(ship.theme.x, ship.theme.y, ship.theme.z);
    rect(10, 570, ship.energy/3, 12);
  }

  //If someone keeps shooting after the minimum energy required it will go down to 0
  if (ship.energy == 300 && mouseIsPressed){
    ship.energy = 0;
  }

  // this variable is to garantee that if someone keeps pressing the pause button it will take 2 ~ 3 sec to respond
  count ++;

  

  //Recharge energy
  if (ship.energy < ship.max_energy && ship.start){
    if (ship.level <= 3){
      ship.energy += 2;
    } else {
      ship.energy += 4;
    }
  }

  if (ship.start){

    //show the score
    textSize(30);
    textAlign(CENTER);
    fill(245);
    text(ship.score,50,50);

    enemy_timer ++;
    //console.log(enemy_timer);

    for (i = 0; i < stars.length; i++){
      stars[i].pos.x -= stars[i].velocity;
    }
  } 

}
