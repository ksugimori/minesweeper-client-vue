<template>
  <div id="app">
    <header>
      <div class="contents">
        <h1>minesweeper-client-vue</h1>
        <nav>
          <router-link to="/">
            How to
          </router-link>
          <router-link to="/play">
            Play
          </router-link>
          <router-link to="/setting">
            Setting
          </router-link>
        </nav>
      </div>
    </header>
    <main>
      <button
        id="post_btn"
        @click="post"
      >
        New Game
      </button>
      <button
        @click="open(0, 0)"
      >
        OPEN
      </button>
      <router-view />
    </main>
  </div>
</template>

<script>
import 'normalize.css'
import axios from 'axios'

export default {
  name: 'App',
  data: function () {
    return { client: axios.create({
      baseURL: '/api'
    }) }
  },
  methods: {
    post: function () {
      this.client.post('/games', { setting: { width: 3, height: 3, numMines: 2 } })
        .then(function (response) {
          /* eslint-disable no-console */
          console.log(JSON.stringify(response.data))
        })
    },
    open: function (x, y) {
      const c = this.client
      this.client.post('/games/1/cells/open', { x: 0, y: 0 })
        .then(function (response) {
          c.get('/games/1')
            .then(function (response) {
              /* eslint-disable no-console */
              console.log(JSON.stringify(response.data))
            })
        })
    }
  }
}
</script>

<style>
#app {
  font-family: "Roboto Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media screen and (min-width: 640px) {
  .contents {
    max-width: 640px;
    padding: 0 0.5rem;
    margin: 0 auto;
  }
}

main {
  width: 100%;
  overflow-x: auto;
}

body {
  margin: 0;
}

header {
  margin-bottom: 1rem;
  background-color: #42b983;
  color: #fff;
}

header h1 {
  padding: 0.5em 0.25em;
  margin: 0;
  text-align: left;
}

nav {
  display: flex;
  justify-content: flex-end;
}

nav a {
  text-decoration: none;
  color: #fff;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  width: 6.3rem;
  display: inline-block;
}

nav .router-link-exact-active {
  background-color: #fff;
  color: #42b983;
}

* {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
