<template>
  <div id="home">
    <ms-button @click="newEasy">
      EASY
    </ms-button>
    <ms-button @click="newNormal">
      NORMAL
    </ms-button>
    <ms-button @click="newHard">
      HARD
    </ms-button>
  </div>
</template>

<script>
import MsButton from '@/components/presentations/MsButton.vue'

export default {
  components: {
    MsButton
  },
  methods: {
    newEasy: async function () {
      let setting = { width: 9, height: 9, numMines: 10 }
      this.$store.dispatch('create', setting)
    },
    newNormal: async function () {
      let setting = { width: 16, height: 16, numMines: 40 }
      this.$store.dispatch('create', setting)
    },
    newHard: async function () {
      let setting = { width: 30, height: 16, numMines: 99 }
      this.$store.dispatch('create', setting)
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
