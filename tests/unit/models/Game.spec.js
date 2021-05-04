import Game from '@/models/Game.js'

/**
 * テストケース
 */
describe('Game', () => {
  describe('#parse', () => {
    test('width, height, numMines が反映されること', () => {
      const data = {
        width: 3,
        height: 2,
        numMines: 1,
        openCells: [],
        flags: [],
        mines: []
      }

      const game = Game.parse(data)

      expect(game.width).toBe(3)
      expect(game.height).toBe(2)
      expect(game.numMines).toBe(1)

      expect(game.field.width).toBe(3)
      expect(game.field.height).toBe(2)
    })

    test('openCells が反映されること', () => {
      const data = {
        width: 3,
        height: 2,
        numMines: 1,
        openCells: [{ x: 0, y: 0, count: 1 }, { x: 2, y: 1, count: 2 }],
        flags: [],
        mines: []
      }

      const game = Game.parse(data)

      expect(game.field.cellAt({ x: 0, y: 0 }).count).toBe(1)
      expect(game.field.cellAt({ x: 2, y: 1 }).count).toBe(2)

      expect(game.field.cellAt({ x: 0, y: 0 }).isOpen).toBeTruthy()
      expect(game.field.cellAt({ x: 2, y: 1 }).isOpen).toBeTruthy()

      const openCount = game.field.points(cell => cell.isOpen).length
      expect(openCount).toBe(2)
    })

    test('flags が反映されること', () => {
      const data = {
        width: 3,
        height: 2,
        numMines: 1,
        openCells: [],
        flags: [{ x: 0, y: 0 }, { x: 2, y: 1 }],
        mines: []
      }

      const game = Game.parse(data)

      expect(game.field.cellAt({ x: 0, y: 0 }).isFlag).toBeTruthy()
      expect(game.field.cellAt({ x: 2, y: 1 }).isFlag).toBeTruthy()

      const openCount = game.field.points(cell => cell.isFlag).length
      expect(openCount).toBe(2)
    })
  })
})
