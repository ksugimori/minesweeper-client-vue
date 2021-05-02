import Game from '@/models/Game.js'

let game = new Game(9, 9, 10)
game.initialize()

const state = {
  game: game
}

export default state
