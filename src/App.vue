<template>
  <div id="app">
    <header>
      <div class="contents">
        <router-link to="/">
          <h1>minesweeper-client-vue</h1>
        </router-link>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>

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

header .router-link-active {
  color: #fff;
  text-decoration: none;
}

header .router-link-active:hover {
  color: #dbf3e8;
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
