import Phaser from 'phaser'

export default class extends Phaser.Sprite {
	constructor (opts) {
		super(opts.game, opts.x || 0, opts.y || 0, opts.key || 'white-square')

		this.tint = opts.tint || 0x999999
		this.width = this.height = opts.size || 64
		this.maxHealth = this.health = opts.health || 10
		this.occupied = false
	}
}
