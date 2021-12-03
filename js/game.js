class Game {
  constructor(mode) {
    this.int_id = setInterval(() => {if (display == 2) {seconds ++}}, 1000)
    camera.position.y = 300
    player.visible = true
    player.x = 600
    player.y = 550
    score = 0
    max_score = 0
    seconds = 0
    last_cars = {}
    last_boats = {}

    if (mode == "T") {
      // End at 05:00
    }
  }

  displayTimer() {
    fill(255)
    textSize(30)
    mins = String(Math.floor(seconds/60)).padStart(2, '0')
    secs = String(seconds % 60)          .padStart(2, '0')
    text(mins+":"+secs, 1150, camera.position.y-270)
  }

  displayScore() {
    fill(255)
    textSize(30)
    text(score, 50, camera.position.y-270)
    text(max_score, 180, camera.position.y-270)
  }

  run() {
    background(0);
    car_lanes  = []
    boat_lanes = []
    for (j=0; j<=18; j++) {
      j_ = terrain[j]
      y_ = (5-j)*100+camera.position.y
      fill(colors[j_])
      rect(0, y_, 1201, -101)
      if ([0, 1, 2].includes(j_)) {
        car_lanes.push(y_-50)
        if (last_cars[y_-50] == undefined) {
          last_cars[y_-50] = 0
        }
      } else if (j_ == 5) {
        boat_lanes.push(y_-50)
        if (last_boats[y_-50] == undefined) {
          last_boats[y_-50] = 0
        }
      }
    }
    this.checkKeys()
    camera.position.y = Math.min(600-max_score*100, 300)

    this.make_cars()
    this.make_boats()
    drawSprites()
    button2.reposition(1120, camera.position.y+220)
  }

  make_cars() {
    for (var i=0; i<car_lanes.length; i++) {
      if (Math.floor(random(0, 50)) == 0 && seconds - last_cars[car_lanes[i]] > 1) {
        car = createSprite(-150, car_lanes[i])
        car.depth = 0
        car.addImage(c2)
        car.scale = 0.6
        car.setSpeed(10, 0)
        car.life = 170
        cars.add(car)
        last_cars[car_lanes[i]] = seconds
      }
    }
  }

  make_boats() {
    for (var i=0; i<boat_lanes.length; i++) {
      if (Math.floor(random(0, 40)) == 0 && seconds - last_boats[boat_lanes[i]] > 2) {
        boat = createSprite(-150, boat_lanes[i])
        boat.depth = 0
        boat.addImage(c3)
        boat.scale = 0.6
        boat.setSpeed(5, 0)
        boat.life = 320
        boats.add(boat)
        last_boats[boat_lanes[i]] = seconds
      }
    }
  }

  checkKeys() {
    if (keyWentDown("UP")) {
      score += 1
      player.y -= 100
      if (max_score < score) {
        max_score = score
        terrain.push(Math.floor(random(0,6)))
        terrain.shift()
        delete last_cars[player.y+100]
        delete last_boats[player.y+100]
      }
    }
    if (keyWentDown("DOWN") && player.y < (850-max_score*100)) {
      score -= 1
      player.y += 100
    }
    if (keyWentDown("LEFT")) {
      player.x = Math.max(player.x - 100, 100)
    }
    if (keyWentDown("RIGHT")) {
      player.x = Math.min(player.x + 100, 1100)
    }
    player.overlap(cars, () => {
      pause()
      cars.destroyEach()
      boats.destroyEach()
      display = 4
    })
  }

}