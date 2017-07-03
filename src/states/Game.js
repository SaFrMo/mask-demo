/* globals __DEV__ */
import Phaser from 'phaser'
import Square from '../gameobjects/Square.js'
import Slicer from '../gameobjects/Slicer.js'

const squareSize = 30
const squareMargin = 3
const gridSize = 4

export default class extends Phaser.State {
	init () {}
	preload () {}

	center () {
		return new Phaser.Point(this.game.world.centerX, this.game.world.centerY)
	}

	gridSide () {
		return squareSize * gridSize
	}

	gridCenter () {
		const center = this.center()
		const gridSideHalf = this.gridSide() / 2
		return new Phaser.Point(center.x - gridSideHalf, center.y - gridSideHalf)
	}

    // gets world coordinates of a given grid square
    // zero-based, counting from top left
	squareCoord (x, y) {
		const topLeft = this.gridCenter()
		const squareHalf = squareSize / 2
		return topLeft.add(x * squareSize + squareHalf, y * squareSize + squareHalf)
	}

	create () {
        // create grid
		this.grid = this.game.add.sprite(this.gridCenter().x, this.gridCenter().y, '')
		this.grid.anchor.set(0.5, 0.5)

        // populate with squares
		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				const newSquare = this.game.add.existing(new Square({
					game: this.game,
					x: x * squareSize + squareMargin,
					y: y * squareSize + squareMargin,
					size: squareSize - squareMargin * 2
				}))

				this.grid.addChild(newSquare)
			}
		}

        // create first slicer
		const startPos = this.squareCoord(0, 0).subtract(squareSize, 0)
		const slicer = this.game.add.existing(new Slicer({
			game: this.game,
			x: startPos.x,
			y: startPos.y
		}))

        // add key listener
		this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(() => {
			slicer.addLine('n')
		})
		this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(() => {
			slicer.addLine('s')
		})
		this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(() => {
			slicer.addLine('e')
		})
		this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(() => {
			slicer.addLine('w')
		})
	}

	render () {
		if (__DEV__) {

        // dev mode entry point!

		}
	}
}
