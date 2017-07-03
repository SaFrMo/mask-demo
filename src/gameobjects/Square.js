import Phaser from 'phaser'
import HealthBar from 'phaser-percent-bar'

export default class extends Phaser.Sprite {
	constructor (opts) {
		super(opts.game, opts.x || 0, opts.y || 0, opts.key || 'white-square')

		this.tint = opts.tint || 0x999999
		this.width = this.height = opts.size || 64
		this.maxHealth = this.health = opts.health || 10
		this.occupied = false

		this.healthBar = this.game.add.existing(new HealthBar({
			game: this.game,
			host: this,
			watch: {
				host: this,
				value: 'health',
				max: this.maxHealth,
				yOffset: 50
			}
		}))
	}

	kill () {

	}

	onIntersectingSlicer (slicer) {

	}

	update () {
		super.update()
		this.healthBar.update()
	}
}
