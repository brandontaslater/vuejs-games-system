<template>
  <div id="board">
    <h1>It's player {{ playerTurn }}'s turn...</h1>

    <div v-bind:style="ticTacToeBoard">
      <square
        v-for="(squareValue, index) in boardSquareValues"
        v-bind:key="index"
        :squareValue="squareValue"
        @click.native="emitClicked(index)"
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
    boardLength: {
      type: [Number, String],
    },
    playerTurn: {
      type: String,
      default: function () {
        return "";
      },
    },
    boardSquareValues: {
      type: Array,
      default: function () {
        return Object.assign({}, Array(16).fill(""));
      },
    },
  },
  created() {},
  data: function () {
    return {
      ticTacToeBoardClass: {
        display: "grid",
        rows: "",
        columns: "",
      },
    };
  },
  methods: {
    emitClicked: function (square) {
      this.$emit("squareClicked", square);
    },
    setTicTacToeClassObject: function () {
      this.ticTacToeBoardClass.rows = "";
      this.ticTacToeBoardClass.columns = "";
      for (let index = 0; index < this.boardLength; index++) {
        this.ticTacToeBoardClass.rows += "100px ";
        this.ticTacToeBoardClass.columns += "100px ";
      }
    },
  },

  computed: {
    ticTacToeBoard: function () {
      this.setTicTacToeClassObject();
      return {
        display: this.ticTacToeBoardClass.display,
        "grid-template-rows": this.ticTacToeBoardClass.rows,
        "grid-template-columns": this.ticTacToeBoardClass.columns,
      };
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
  grid-template-rows: 100px 100px 100px 100px 100px 100px;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
}
</style>