var b1, b2, b3
var button1, button2, button3, button4

var a1
var font, titleY, titleYA

var display
/*
display:
0  Main menu
1  Game
2  Game over
*/

function  preload() {
  b1 = loadImage("assets/b1.png")
  b2 = loadImage("assets/b2.png")
  b3 = loadImage("assets/b3.png")
  b4 = loadImage("assets/b4.png")

  a1 = loadSound("assets/a1.mp3")
  font = loadFont("assets/font.ttf")
}

function setup() {
  createCanvas(1200, 600);
  button1 = createSprite(600, 200)
  button1.addImage(b1)
  button1.scale = 0.8

  button4 = createSprite(1120, 520)
  button4.addImage(b4)
  button4.scale = 0.8
  button4.visible = false

  textFont(font)
  textSize(80)
  titleY = 130
  titleYA = 2

  display = 0
  textAlign(CENTER)
}

function draw() {
  background(0);
  caller()
  drawSprites();
}

function caller() {
  if (display == 0) {
    title_()
    button1_()
  } else if (display == 1) {
    button4_()
  }
}

function title_() {
  fill(255)
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

function button1_() {
  if (mousePressedOver(button1)) {
    button1.visible = false
    display = 1
    start()
  }
}

function button4_() {
  if (mousePressedOver(button4)) {
    button1.visible = true
    button4.visible = false
    display = 0
  }
}

function start() {
  text("1")
  button4.visible = true
}

function mouseClicked() {
  a1.play()
}