class Button {
  constructor(x, y, image, visibility) {
    this.button = createSprite(x, y)
    this.button.addImage(image)
    this.button.scale = 0.8
    this.button.visible = visibility
  }

  reposition(x, y) {
    this.button.y = y
    this.button.x = x
  }

  setVisibility(visibility) {
    this.button.visible = visibility
  }

  mousePressed() {
    return mousePressedOver(this.button)
  }
}