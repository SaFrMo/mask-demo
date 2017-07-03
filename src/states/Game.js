/* globals __DEV__ */
import Phaser from 'phaser'
import Square from '../gameobjects/Square.js'
import Slicer from '../gameobjects/Slicer.js'

export default class extends Phaser.State {
	init () {}
	preload () {}

	create () {
        // create grid
		this.game.add.existing(new Square({
			game: this.game
		}))

        // create first slicer
		const slicer = this.game.add.existing(new Slicer({
			game: this.game,
			x: 20,
			y: 20
		}))
	}

	render () {
		if (__DEV__) {

        // dev mode entry point!

		}
	}
}
