<template>
  <div class="square">
    <p>{{ squareValue }}</p>
  </div>
</template>

<script>
export default {
  name: "TicTacToeSquare",
  components: {},
  props: {
    squareValue: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  data: function () {
    return {
      value: "",
    };
  },
};
</script>

<style>
.square {
  background: #444;
  border: 1px solid white;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.square:hover {
  cursor: pointer;
  background-color: grey;
}
</style>