import axios from 'axios'
import Game from '@/models/Game.js'

const actions = {
  /**
   * フラグを立てる、外す
   */
  async flag ({ commit, state }, point) {
    const game = state.game
    const cell = game.field.cellAt(point)

    if (cell.isFlag) {
      await axios.delete(`/api/games/${game.id}/flags/x${point.x}y${point.y}`)

      cell.unflag()
      commit('updateGame', { game })
    } else {
      await axios.post(`/api/games/${game.id}/flags`, point)

      cell.flag()
      commit('updateGame', { game })
    }
  },

  /**
   * セルを開く
   */
  async open ({ commit, state }, point) {
    const game = state.game

    const response = await axios.post(`/api/games/${game.id}/open-cells`, point)

    game.open(response.data)
    commit('updateGame', { game })

    // ステータスが終了状態になっていないか確認
    const status = await axios.get(`/api/games/${game.id}/status`).then(r => r.data.status)
    if (status !== 'WIN' && status !== 'LOSE') {
      return
    }

    // 終了していれば最新の状態を取得しなおす
    const latestGame = await axios.get(`/api/games/${game.id}`).then(r => r.data)

    game.status = latestGame.status
    latestGame.mines.forEach(p => {
      game.field.cellAt(p).mine()
    })
    latestGame.openCells.forEach(p => {
      const cell = game.field.cellAt(p)
      cell.unflag()
      cell.open()
      cell.count = p.count
    })

    commit('updateGame', { game })
  },

  /**
   * ゲームをリセットして新しく作成しなおす。
   */
  async reset ({ commit }, setting) {
    const response = await axios.post('/api/games', { setting })

    const game = Game.parse(response.data)

    commit('updateGame', { game })
  }
}

export default actions
