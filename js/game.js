class Game {
  constructor(mode) {
    setInterval(() => {seconds ++}, 1000)
    player.visible = true

    if (mode == "T") {
      // End at 05:00
    }
  }

  displayTimer() {
    fill(255)
    textSize(30)
    minute = String(Math.floor(seconds/60)).padStart(2, '0')
    second = String(seconds % 60)          .padStart(2, '0')
    text(minute+":"+second, 1150, camera.position.y-270)
  }

  displayScore() {
    fill(255)
    textSize(30)
    text(score, 20, camera.position.y-270)
    text(max_score, 150, camera.position.y-270)
  }

  run() {
    background(0);
    for (j=0; j<=7; j++) {
      fill(colors[terrain[j]])
      rect(0, (5-j)*100+camera.position.y, 1201, -101)
    }
    this.checkKeys()
    camera.position.y = Math.min(600-max_score*100, 300)
    drawSprites()
    button4.reposition(1120, camera.position.y+220)

  }

  checkKeys() {
    if (keyWentDown("UP")) {
      score += 1
      player.y -= 100
      if (max_score < score) {
        max_score = score
        terrain.push(Math.floor(random(0,6)))
        terrain.shift()
        console.log(terrain)
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
  }

}