import { Scene } from 'phaser'

export class Main extends Scene {
  constructor() {
      super('Main')
  }

  preload() {
    this.load.image('background', 'assets/bg.png')
    this.load.image('cloud_left_1', 'assets/cloud-left-1.png')
    this.load.image('cloud_left_2', 'assets/cloud-left-2.png')
    this.load.image('cloud_left_3', 'assets/cloud-left-3.png')
    this.load.image('cloud_right_1', 'assets/cloud-right-1.png')
    this.load.image('cloud_right_2', 'assets/cloud-right-2.png')
    this.load.image('cloud_right_3', 'assets/cloud-right-3.png')
    this.load.image('ground', 'assets/ground.png')
    this.load.image('lantern', 'assets/lantern.png')
  }

  create() {
    const camera = this.cameras.main
    camera.centerOn(0, 0)

    this.add.image(-camera.width / 2, camera.height / 2, 'background')

    this.clouds = [
      { object: this.add.sprite(-375, 80, 'cloud_left_1'), z: -200 },
      { object: this.add.sprite(400, 80, 'cloud_right_1'), z: -200 },
      { object: this.add.sprite(-500, 100, 'cloud_left_2'), z: -400 },
      { object: this.add.sprite(500, 100, 'cloud_right_2'), z: -400 },
      { object: this.add.sprite(-560, 120, 'cloud_left_3'), z: -600 },
      { object: this.add.sprite(560, 120, 'cloud_right_3'), z: -600 },
    ]

    this.lantern = { object: this.add.sprite(0, -50, 'lantern'), z: 0 }

    this.ground = { object: this.add.image(0, 300, 'ground'), z: 0 }

    this.sceneObjects = [
      ...this.clouds,
      this.lantern,
      this.ground,
    ]

    for (const obj of this.sceneObjects) {
      obj.object.setScale(0.5)
      obj.identity = { x: obj.object.x, y: obj.object.y }
    }

    this.zoom = 0
    this.translateX = 0

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(time, delta) {
    if (this.cursors.up.isDown) {
      this.zoom += 0.05
    } else if (this.cursors.down.isDown) {
      this.zoom -= 0.05
    }
    if (this.cursors.left.isDown) {
      this.translateX += 2
    } else if (this.cursors.right.isDown) {
      this.translateX -= 2
    }

    this.zoom = Math.max(0, this.zoom)

    for (const obj of this.sceneObjects) {
      let zFactor = (1000 - obj.z) / 1000
      let zx = (obj.identity.x / 3) * zFactor
      let zy = (obj.identity.y / 3) * zFactor
      let offsetX = this.translateX * zFactor * 2
    
      obj.object.x = obj.identity.x + this.zoom * zx + offsetX
      obj.object.y = obj.identity.y + this.zoom * zy
      obj.object.setScale(0.5 + this.zoom * (zFactor / 10))
    }
  }
}
