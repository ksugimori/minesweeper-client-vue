<template>
  <div id="home">
    <button @click="reset">
      New Game
    </button>
  </div>
</template>

<script>

export default {
  methods: {
    reset: async function () {
      let setting = { width: 9, height: 9, numMines: 5 }
      this.$store.dispatch('reset', setting)
    }
  }
}
</script>

<style scoped>
.board {
  padding: 0.5em;
  display: inline-grid;
}

</style>
