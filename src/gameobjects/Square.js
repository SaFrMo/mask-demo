import Phaser from 'phaser'
import HealthBar from 'phaser-percent-bar'

export default class extends Phaser.Sprite {
	constructor (opts) {
		super(opts.game, opts.x || 0, opts.y || 0, opts.key || '')

		this.maxHealth = this.health = opts.health || 10
		this.occupied = false

        // Visible representation of the square
		this.square = this.game.add.sprite(opts.margin || 0, opts.margin || 0, 'white-square')
		this.square.tint = opts.tint || 0x999999
		this.square.width = this.square.height = opts.size
		this.addChild(this.square)

		this.healthBar = this.game.add.existing(new HealthBar({
			game: this.game,
			host: this,
			height: 4,
			watch: {
				host: this,
				value: 'health',
				max: this.maxHealth
			},
			yOffset: opts.size / 2 + 2
		}))
	}

	kill () {

	}

	onIntersectingSlicer (slicer) {

	}

	update () {
		super.update()
		// this.masterSprite.update()
		// console.log(this.healthBar)
	}
}
