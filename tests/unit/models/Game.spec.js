import Game from '@/models/Game.js'

/**
 * テストケース
 */
describe('Game', () => {
  describe('#initialize', () => {
    test('初期状態では openCells が空となっていること', () => {
      const game = new Game(3, 3, 2)

      expect(game.openCells).toEqual([])
    })

    test('初期状態では flags が空となっていること', () => {
      const game = new Game(3, 3, 2)

      expect(game.flags).toEqual([])
    })
  })
})
