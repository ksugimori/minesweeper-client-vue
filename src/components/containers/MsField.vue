<template>
  <div class="field">
    <div
      v-for="(row, y) in field.rows"
      :key="y"
      class="row"
    >
      <ms-cell
        v-for="(cell, x) in row"
        :key="x"
        :count="cell.countString"
        :mine="cell.isMine"
        :flag="cell.isFlag"
        :miss="status.isEnd && cell.isMiss"
        :open="status.isEnd || cell.isOpen"
        @click="open(x, y)"
        @right-click="flag(x, y)"
      />
    </div>
  </div>
</template>

<script>
import MsCell from '@/components/presentations/MsCell.vue'
import axios from 'axios'

export default {
  components: {
    MsCell
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
    field: function () {
      return this.game.field
    },
    status: function () {
      return this.game.status
    }
  },
  methods: {
    open: function (x, y) {
      // TODO actions として整理
      const id = this.$store.state.game.id
      this.client.post(`/games/${id}/open-cells`, { x, y })
        .then(response => {
          const game = this.$store.state.game
          game.open(response.data)
          this.$store.commit('updateGame', { game })

          this.client.get(`/games/${id}/status`)
            .then(res => {
              const status = res.data.status
              if (status === 'WIN' || status === 'LOSE') {
                this.client.get(`/games/${id}`)
                  .then(gameRes => {
                    this.$store.commit('updateGame', { game: gameRes.data })
                  })
              }
            })
        })
    },
    flag: function (x, y) {
      const id = this.$store.state.game.id
      const game = this.$store.state.game
      const cell = this.$store.state.game.field.cellAt({ x, y })

      if (cell.isFlag) {
        this.client.delete(`/games/${id}/flags/x${x}y${y}`)
          .then(response => {
            cell.unflag()
            this.$store.commit('updateGame', { game })
          })
      } else {
        this.client.post(`/games/${id}/flags`, { x, y })
          .then(response => {
            cell.flag()
            this.$store.commit('updateGame', { game })
          })
      }
    }
  }
}
</script>

<style scoped>
.field {
  display: inline-flex;
  flex-direction: column;
}
.row {
  display: inline-flex;
  flex-direction: row;
}
</style>
