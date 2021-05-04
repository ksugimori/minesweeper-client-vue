import Status from '@/models/status/Status.js'
import Point from '@/models/util/Point.js'
import Field from '@/models/Field.js'
import StopWatch from '@/models/util/StopWatch.js'

/**
 * マインスイーパー全体を管理するクラス
 */
class Game {
  constructor (width, height, numMines) {
    this.width = width
    this.height = height
    this.numMines = numMines

    this.status = Status.INIT
    this.StopWatch = new StopWatch()

    this.field = new Field(width, height)
  }

  initialize () {
    this.status = Status.INIT
    this.StopWatch = new StopWatch()

    this.field = new Field(this.width, this.height)
  }

  get flagCount () {
    return this.field.points(cell => cell.isFlag).length
  }

  open (openCells) {
    this.field.rows.flat().forEach(c => c.close())
    for (const p of openCells) {
      const cell = this.field.cellAt(p)
      cell.open()
      cell.count = p.count
    }
  }

  flag (x, y) {
    const p = Point.of(x, y)
    this.field.cellAt(p).flag()
  }

  static parse (data) {
    const result = new Game(data.width, data.height, data.numMines)

    result.id = data.id

    result.status = data.status

    data.cells.filter(cell => cell.isOpen).forEach(p => {
      const cell = result.field.cellAt(p)
      cell.open()
      cell.count = p.count
    })
    data.cells.filter(cell => cell.isFlag).forEach(p => result.field.cellAt(p).flag())

    return result
  }
}

export default Game
