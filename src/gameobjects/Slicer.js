import Phaser from 'phaser'

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
		this.lines = opts.lines || []
		this.points = opts.points || []
		this.tip = opts.tip || new Phaser.Point(0, 0)
		this.direction = opts.direction || directions.EAST
		this.speed = opts.speed || 10

		this.addLine(this.direction)
	}

	addLine (newDirection = directions.EAST) {
        // Save tip as endpoint of last line
		// this.points.push(new Phaser.Point(this.tip.x, this.tip.y))

		const newLine = this.addChild(
            new Phaser.Sprite(this.game,
                              0,
                              0,
                              'white-square')
        )
		newLine.tint = this.opts.tint || 0x00ff00
		let width = 0
		let height = 0

		switch (true) {
		case newDirection === directions.NORTH:
			width = 5
			height = 0
			break
		case newDirection === directions.SOUTH:
			width = 5
			height = 0
			break
		case newDirection === directions.WEST:
			width = 0
			height = 5
			break
		default:
			width = 0
			height = 5
			break
		}

		newLine.width = width
		newLine.height = height

		this.lines.push(newLine)
	}

	lastLine () {
		return this.lines[this.lines.length - 1]
	}

	update () {
		super.update()

        // get new tip position
		const delta = this.game.time.physicsElapsed * this.speed
		if (this.direction === directions.NORTH || this.direction === directions.SOUTH) {
			this.tip.y += delta * (this.direction === directions.NORTH ? -1 : 1)
			this.lastLine().height = this.tip.y - this.lastLine().y
		} else {
			this.tip.x += delta * (this.direction === directions.WEST ? -1 : 1)
			this.lastLine().width = this.tip.x - this.lastLine().x
		}
	}
}
