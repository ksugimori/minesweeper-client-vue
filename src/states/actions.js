import axios from 'axios'
import Game from '@/models/Game.js'

const actions = {
  async flag ({ commit, state }, point) {
    const id = state.game.id
    const game = state.game
    const cell = state.game.field.cellAt(point)

    if (cell.isFlag) {
      await axios.delete(`/api/games/${id}/flags/x${point.x}y${point.y}`)

      cell.unflag()
      commit('updateGame', { game })
    } else {
      await axios.post(`/api/games/${id}/flags`, point)

      cell.flag()
      commit('updateGame', { game })
    }
  },

  async open ({ commit, state }, point) {
    const id = state.game.id

    const response = await axios.post(`/api/games/${id}/open-cells`, point)

    const game = state.game
    game.open(response.data)
    commit('updateGame', { game })

    // ステータスが終了状態になっていないか確認
    const status = await axios.get(`/api/games/${id}/status`).then(r => r.data.status)
    if (status !== 'WIN' && status !== 'LOSE') {
      return
    }

    const latestGame = await axios.get(`/api/games/${id}`).then(r => r.data)

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

  async reset ({ commit }, setting) {
    const response = await axios.post('/api/games', { setting })

    const game = Game.parse(response.data)

    commit('updateGame', { game })
  }
}

export default actions
