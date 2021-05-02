<template>
  <div class="status-bar">
    <ms-status-bar-item title="mines">
      <ms-counter :value="mines" />
    </ms-status-bar-item>
    <ms-status-bar-item>
      <ms-reset-button
        :status="status"
        @click="reset"
      />
    </ms-status-bar-item>
    <ms-status-bar-item title="time">
      <ms-counter :value="playTime" />
    </ms-status-bar-item>
  </div>
</template>

<script>
import MsStatusBarItem from '@/components/containers/MsStatusBarItem.vue'
import MsCounter from '@/components/presentations/MsCounter.vue'
import MsResetButton from '@/components/presentations/MsResetButton.vue'
import Game from '@/models/Game.js'
import axios from 'axios'

export default {
  components: {
    MsStatusBarItem,
    MsCounter,
    MsResetButton
  },
  data: function () {
    return {
      client: axios.create({
        baseURL: '/api'
      })
    }
  },
  computed: {
    game: function () {
      return this.$store.state.game
    },
    mines: function () {
      if (this.status.isEnd) {
        return 0
      } else {
        if (this.game) {
          return this.game.numMines - this.game.flagCount
        } else {
          return 0
        }
      }
    },
    playTime: function () {
      return this.game.playTime
    },
    status: function () {
      return this.game.status
    }
  },
  methods: {
    reset: async function () {
      let setting = { width: 9, height: 9, numMines: 5 }
      const response = await this.client.post('/games', { setting })

      const game = Game.parse(response.data)

      this.$store.commit('updateGame', { game })
    }
  }
}
</script>

<style scoped>
.status-bar {
  display: inline-flex;
  justify-content: space-between;
}
</style>
