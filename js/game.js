class Game {
  constructor(mode) {
    this.int_id = setInterval(() => {if (display == 2) {seconds ++}}, 1000)
    player.visible = true

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
      } else if (j_ == 5) {
        boat_lanes.push(y_)
      }
    }
    this.checkKeys()
    camera.position.y = Math.min(600-max_score*100, 300)

    this.make_cars()
    drawSprites()
    button2.reposition(1120, camera.position.y+220)
  }

  make_cars() {
    if (seconds >= next_car) {
      car = createSprite(-150, car_lanes[Math.floor(random(0, car_lanes.length))])
      car.addImage(c2)
      car.scale = 0.6
      car.setSpeed(10, 0)
      cars.add(car)
      next_car += 5/(car_lanes.length**1.15)
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
      display = 4
    })
  }

}