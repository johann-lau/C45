var b1, b2, b3, b4, m1, m2, c1
var button1, button2, button3, button4
var mode1, mode2

var score = 0, max_score = 0
var colors

var a1
var font, titleY, titleYA
var game, seconds = 0, player, terrain = [4, 4, 4, 4], car_lanes, boat_lanes
var next_car=1, next_boat=1
var car, boat
var cars, boats
var mins, secs

var display
var i=0, j=0, k, y_, j_;
/*
display:
0  Main menu
1  Mode menu
2  Game
3  Exit confirmation
4  Game over
queue
*/
var colors = ["#888898", "#888898", "#888898", "#43DE3B", "#43DE3B", "#28A9FF"]

function  preload() {
  b1 = loadImage("assets/b1.png")
  b2 = loadImage("assets/b2.png")
  b3 = loadImage("assets/b3.png")
  b4 = loadImage("assets/b4.png")

  m1 = loadImage("assets/m1.png")
  m2 = loadImage("assets/m2.png")

  c1 = loadImage("assets/c1.png")
  c2 = loadImage("assets/c2.png")

  a1 = loadSound("assets/a1.mp3")
  font = loadFont("assets/font.ttf")
}

function setup() {
  createCanvas(1200, 600);

  button1 = new Button(600, 200, b1, true)
  button2 = new Button(1120, 520, b2, false)
  button3 = new Button(660, 300, b3, false)
  button4 = new Button(1120, 520, b4, false)

  mode1 = new Button(540, 300, m1, false)
  mode2 = new Button(660, 300, m2, false)

  player = createSprite(600, 550)
  player.addImage(c1)
  player.visible = false
  player.scale=0.6

  for (i; i<=14; i++) {
    terrain.push(Math.floor(random(0,6)))
  }

  textFont(font)
  textSize(80)
  titleY = 130
  titleYA = 2
  fill(255)

  cars = new Group()

  display = 0
  textAlign(CENTER)
}

function draw() {
  console.log(camera.position.y)
  if (display != 2) {
    background(0);
  }
  caller()
  if (display != 2) {
    drawSprites();
  }
}

function caller() {
  if (display == 2) {
    game.run()
  }
  if (display == 0) {
    button1.setVisibility(true)
    title_()
    button1_()
  } else if (display == 1) {
    mode1.setVisibility(true)
    mode2.setVisibility(true)
    button4.setVisibility(true)
    button4_()
    mode1_()
    mode2_()
  } else if (display == 2) {
    button2.setVisibility(true)
    button2_()
    game.displayTimer()
    game.displayScore()
  } else if (display == 3) {
    exit_()
  } else if (display == 4) {
    over_()
  }
}

function exit_() {
  textSize(60)
  text("Are you sure you want to quit?", 600, 80)
  button3_()
  button4_()
}

function over_() {
  textSize(80)
  text("Game over", 600, 80)
  textSize(40)
  text("Unfortunately, the character has experienced a car crash.", 600, 160)
  button4.reposition(600, 520)
}

function title_() {
  if (titleY > 120 && titleYA == 1) {
    titleYA = -2
  } else if (titleY > 115 && titleYA == 2) {
    titleYA = 1
  } else if (titleY < 75 && titleYA == -2) {
    titleYA = -1
  } else if (titleY < 70 && titleYA == -1) {
    titleYA = 2
  }
  titleY += titleYA
  text("Crossy Road", 600, titleY)
}

function pause() {
  camera.position.y = 300
  console.log(camera.position.y)
  player.visible = false
  cars.visible = false
  button4.setVisibility(true)
  button2.setVisibility(false)
  for (k of cars) {
    k.visible = false
    k.setSpeed(0)
  }
}

function button1_() {
  if (button1.mousePressed()) {
    button1.setVisibility(false)
    button4.reposition(1120, 520)
    display = 1
  }
}

function button2_() {
  if (button2.mousePressed()) {
    display = 3
    button4.reposition(540, 300)
    button3.setVisibility(true)
    pause()
  }
}

function button3_() {
  if (button3.mousePressed()) {
    button3.setVisibility(false)
    button4.setVisibility(false)
    display = 0
    clearInterval(game.int_id)
    game = null
    seconds = 0
  }
}

function button4_() {
  if (button4.mousePressed()) {
    if (display == 3) {
      display = 2
      player.visible = true
      for (k of cars) {
        k.visible = true
        k.setSpeed(10)
      }
      button3.setVisibility(false)
      button4.setVisibility(false)
      button2.setVisibility(true)
    } else {
      button4.setVisibility(false)
      mode1.setVisibility(false)
      mode2.setVisibility(false)
      display = 0
    }
  }
}

function mode1_() {
  if (mode1.mousePressed()) {
    mode1.setVisibility(false)
    mode2.setVisibility(false)
    button4.setVisibility(false)
    button2.setVisibility(true)
    display = 2
    game = new Game("T")
  }
}

function mode2_() {
  if (mode2.mousePressed()) {
    mode1.setVisibility(false)
    mode2.setVisibility(false)
    button4.setVisibility(false)
    button2.setVisibility(true)
    display = 2
    game = new Game("I")
  }
}

function mouseClicked() {
  a1.play()
}