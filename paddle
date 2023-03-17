class Paddle extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color) {
    super(scene, x, y, width, height, color);
    scene.add.existing(this);
  }

  setY(newY) {
    this.y = Phaser.Math.Clamp(newY, this.height / 2, this.scene.scale.height - this.height / 2);
  }
}

export default Paddle;
