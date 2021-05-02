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
import Field from '@/models/Field'
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
      const f = new Field(this.game.width, this.game.height)
      this.game.openCells.forEach(p => {
        const cell = f.cellAt(p)
        cell.open()
        cell.count = p.count
      })
      this.game.flags.forEach(p => f.cellAt(p).flag())
      window.console.log(f)
      return f
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
          game.openCells = response.data

          this.$store.commit('updateGame', { game })
        })
    },
    flag: function (x, y) {
      const id = this.$store.state.game.id
      this.client.post(`/games/${id}/flags`, { x, y })
        .then(response => {
          const game = this.$store.state.game
          game.flags = response.data

          this.$store.commit('updateGame', { game })
        })
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
