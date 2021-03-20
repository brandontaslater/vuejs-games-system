<template>
  <div id="board">
    <h1>It's player {{ playerTurn }}'s turn...</h1>
    <div class="tictactoe-board">
      <square
        :squareValue="boardSquareValues[0]"
        @click.native="emitClicked(0)"
      ></square>
      <square
        :squareValue="boardSquareValues[1]"
        @click.native="emitClicked(1)"
      ></square>
      <square
        :squareValue="boardSquareValues[2]"
        @click.native="emitClicked(2)"
      ></square>
      <square
        @click.native="emitClicked(3)"
        :squareValue="boardSquareValues[3]"
      ></square>
      <square
        :squareValue="boardSquareValues[4]"
        @click.native="emitClicked(4)"
      ></square>
      <square
        :squareValue="boardSquareValues[5]"
        @click.native="emitClicked(5)"
      ></square>
      <square
        :squareValue="boardSquareValues[6]"
        @click.native="emitClicked(6)"
      ></square>
      <square
        :squareValue="boardSquareValues[7]"
        @click.native="emitClicked(7)"
      ></square>
      <square
        :squareValue="boardSquareValues[8]"
        @click.native="emitClicked(8)"
      ></square>
    </div>
  </div>
</template>

<script>
import square from "./Square";

export default {
  name: "TicTacToeBoard",
  components: {
    square,
  },
  props: {
    playerTurn: {
      type: String,
    },
    boardSquareValues: {
      type: Array,
      default: function () {
        return Object.assign({}, Array(9).fill(""));
      },
    },
  },
  created() {},
  data: function () {
    return {};
  },
  methods: {
    emitClicked: function (square) {
      this.$emit("squareClicked", square);
    },
  },
};
</script>

<style>
#board {
  padding-bottom: 25px;
}
.tictactoe-board {
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
}
</style>