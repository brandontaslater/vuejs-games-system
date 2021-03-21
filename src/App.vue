<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="120" height="120" />
    <TicTacToeGame></TicTacToeGame>
  </div>
</template>

<script>
import TicTacToeGame from "./view/TicTacToeGame.vue";

export default {
  name: "App",
  components: {
    TicTacToeGame,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
