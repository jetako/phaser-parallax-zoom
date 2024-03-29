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
      { object: this.add.sprite(-375, 80, 'cloud_left_1'), zx: -1000, zy: 0, zs: 1.1 },
      { object: this.add.sprite(400, 80, 'cloud_right_1'), zx: 1000, zy: 0, zs: 1.1 },
      { object: this.add.sprite(-500, 100, 'cloud_left_2'), zx: -1500, zy: 0, zs: 1.2 },
      { object: this.add.sprite(500, 100, 'cloud_right_2'), zx: 1500, zy: 0, zs: 1.2 },
      { object: this.add.sprite(-560, 120, 'cloud_left_3'), zx: -2000, zy: 0, zs: 1.3 },
      { object: this.add.sprite(560, 120, 'cloud_right_3'), zx: 2000, zy: 0, zs: 1.3 },
    ]

    this.lantern = { object: this.add.sprite(0, -50, 'lantern'), zx: 0, zy: -800, zs: 1.2 }

    this.ground = { object: this.add.image(0, 300, 'ground'), zx: 0, zy: 400, zs: 1.4 }

    this.sceneObjects = [
      ...this.clouds,
      this.lantern,
      this.ground,
    ]

    for (const obj of this.sceneObjects) {
      obj.object.setScale(0.5)
      obj.identity = { x: obj.object.x, y: obj.object.y }
    }

    this.cursors = this.input.keyboard.createCursorKeys()

    this.zoom = 0
  }

  update(time, delta) {
    if (this.cursors.up.isDown) {
      this.zoom += 0.005
    } else if (this.cursors.down.isDown) {
      this.zoom -= 0.005
    }

    this.zoom = Math.max(0, this.zoom)

    for (const obj of this.sceneObjects) {
      obj.object.x = obj.identity.x + this.zoom * obj.zx
      obj.object.y = obj.identity.y + this.zoom * obj.zy
      obj.object.setScale(0.5 + this.zoom * obj.zs)
    }
  }
}
