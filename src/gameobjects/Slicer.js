import Phaser from 'phaser'
import HealthBar from 'phaser-percent-bar'

const directions = {
	NORTH: 'n',
	SOUTH: 's',
	EAST: 'e',
	WEST: 'w'
}

export default class extends Phaser.Sprite {
	constructor (opts) {
		super(opts.game, opts.x || 0, opts.y || 0, opts.key || 'white-square')
		this.opts = opts

        // Save line info
		this.lines = opts.lines || []
		this.tip = opts.tip || new Phaser.Point(0, 0)
		this.direction = opts.direction || directions.EAST

        // Speed info
		this.speed = opts.speed || 10
		this.currentSpeed = this.speed

        // Combat info
		this.dps = opts.dps || 10

        // Health info
		this.health = this.maxHealth = opts.health || 100

		this.healthBar = this.game.add.existing(new HealthBar({
			game: this.game,
			host: this,
			watch: {
				host: this,
				value: 'health',
				max: this.maxHealth
			},
			width: 100

		}))

        // Health bar

		this.addLine(this.direction)
	}

	addLine (newDirection = directions.EAST) {
		this.direction = newDirection

		const newLine = this.addChild(this.game.make.sprite(this.tip.x, this.tip.y, 'white-square'))
		newLine.tint = this.opts.tint || 0x00ff00
		let width = 0
		let height = 0
		let anchorX = 0
		let anchorY = 0

		switch (true) {
		case newDirection === directions.NORTH:
			anchorX = 0.5
			width = 5
			height = 0
			break
		case newDirection === directions.SOUTH:
			anchorX = 0.5
			width = 5
			height = 0
			break
		case newDirection === directions.WEST:
			anchorY = 0.5
			width = 0
			height = 5
			break
		default:
			anchorY = 0.5
			width = 0
			height = 5
			break
		}

		newLine.anchor.setTo(anchorX, anchorY)
		newLine.width = width
		newLine.height = height

		this.lines.push(newLine)
	}

	lastLine () {
		return this.lines[this.lines.length - 1]
	}

	onIntersectingSquare (square) {
		if (square.health > 0) {
			this.currentSpeed = 0
			square.damage(this.game.time.physicsElapsed * this.dps)
		} else {
			this.currentSpeed = this.speed
		}
	}

	update () {
		super.update()

        // get new tip position and apply to active line
		const delta = this.game.time.physicsElapsed * this.currentSpeed
		if (this.direction === directions.NORTH || this.direction === directions.SOUTH) {
			this.tip.y += delta * (this.direction === directions.NORTH ? -1 : 1)
			this.lastLine().height = this.tip.y - this.lastLine().y
		} else {
			this.tip.x += delta * (this.direction === directions.WEST ? -1 : 1)
			this.lastLine().width = this.tip.x - this.lastLine().x
		}
	}
}
