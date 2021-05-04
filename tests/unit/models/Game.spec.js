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
        cells: []
      }

      const game = Game.parse(data)

      expect(game.width).toBe(3)
      expect(game.height).toBe(2)
      expect(game.numMines).toBe(1)

      expect(game.field.width).toBe(3)
      expect(game.field.height).toBe(2)
    })

    test('count が反映されること', () => {
      const data = {
        width: 3,
        height: 2,
        numMines: 1,
        cells: [
          { x: 0, y: 0, count: 1, isOpen: true },
          { x: 1, y: 0, count: 2, isOpen: false },
          { x: 2, y: 0, count: 3, isOpen: true },
          { x: 0, y: 1, count: 4, isOpen: false },
          { x: 1, y: 1, count: 5, isOpen: true },
          { x: 2, y: 1, count: 6, isOpen: false }
        ]
      }

      const game = Game.parse(data)

      expect(game.field.cellAt({ x: 0, y: 0 }).count).toBe(1)
      expect(game.field.cellAt({ x: 1, y: 0 }).count).toBe(0)
      expect(game.field.cellAt({ x: 2, y: 0 }).count).toBe(3)
      expect(game.field.cellAt({ x: 0, y: 1 }).count).toBe(0)
      expect(game.field.cellAt({ x: 1, y: 1 }).count).toBe(5)
      expect(game.field.cellAt({ x: 2, y: 1 }).count).toBe(0)
    })

    test('isOpen が反映されること', () => {
      const data = {
        width: 3,
        height: 2,
        numMines: 1,
        cells: [{ x: 0, y: 0, isOpen: true }, { x: 2, y: 1, isOpen: false }]
      }

      const game = Game.parse(data)

      expect(game.field.cellAt({ x: 0, y: 0 }).isOpen).toBeTruthy()
      expect(game.field.cellAt({ x: 2, y: 1 }).isOpen).toBeFalsy()

      const openCount = game.field.points(cell => cell.isOpen).length
      expect(openCount).toBe(1)
    })

    test('isFlag が反映されること', () => {
      const data = {
        width: 3,
        height: 2,
        numMines: 1,
        cells: [{ x: 0, y: 0, isFlag: true }, { x: 2, y: 1, isFlag: false }]
      }

      const game = Game.parse(data)

      expect(game.field.cellAt({ x: 0, y: 0 }).isFlag).toBeTruthy()
      expect(game.field.cellAt({ x: 2, y: 1 }).isFlag).toBeFalsy()

      const openCount = game.field.points(cell => cell.isFlag).length
      expect(openCount).toBe(1)
    })
  })
})
