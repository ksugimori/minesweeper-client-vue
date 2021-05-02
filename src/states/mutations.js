const mutations = {
  updateGame (state, { game }) {
    state.game = game
  },

  // 盤面の初期化
  initialize (state) {
    state.game.initialize()
  }

}

export default mutations
