<template>
  <div id="game">
    <h1>Tic Tac Toe</h1>
    <h3 class="warning" v-show="warning.display">{{ warning.message }}</h3>
    <div v-show="show.input" class="input">
      <section>
        <h3>Select a Board Size?</h3>
        <input
          type="radio"
          v-model="input.boardSize"
          value="3"
          @click="displayRuleWarning(3)"
        />Standard
        <input
          type="radio"
          v-model="input.boardSize"
          value="4"
          @click="displayRuleWarning(4)"
        />Medium
        <input
          type="radio"
          v-model="input.boardSize"
          value="5"
          @click="displayRuleWarning(5)"
        />Large
        <br />
      </section>
      <p>
        <strong>{{ input.boardSize }} x {{ input.boardSize }}</strong> Board
        Size.
      </p>
      <button @click="initialise">Play</button>
    </div>
    <div v-show="show.board" id="tic-tac-toe-board">
      <board
        :boardLength="parseInt(input.boardSize, 10)"
        :boardSquareValues="boardSquareValues"
        v-on:squareClicked="squareClicked"
        :playerTurn="playerTurn"
      ></board>
    </div>
    <button
      v-show="show.board"
      @click="resetGame"
      style="width: 100px; padding: 10px 0px; margin-right: 15px"
    >
      Reset Board
    </button>
    <button
      v-show="show.board"
      @click="backToSelection"
      style="width: 100px; padding: 10px 0px; margin-left: 15px"
    >
      Back
    </button>
  </div>
</template>

<script>
import board from "../components/TicTacToe/Board";

export default {
  name: "TicTacToeGame",
  components: {
    board,
  },
  data: function () {
    return {
      input: {
        boardSize: 3,
      },
      boardSquareValues: [],
      playerTurn: "X",
      winningPlayer: "",
      winLines: [],
      warning: {
        display: false,
        message: "",
      },
      show: {
        input: true,
        board: false,
      },
      potentialWinner: [true, true],
      squaresOccupied: 0,
    };
  },
  created() {},
  computed: {},
  methods: {
    initialise: function () {
      this.warning.display = false;
      this.winningPlayer = "";
      this.playerTurn = "X";
      this.squaresOccupied = 0;
      this.potentialWinner = [true, true];
      this.boardSquareValues = Array(
        this.input.boardSize * this.input.boardSize
      ).fill("");
      this.winLinesCalc();
      this.show.input = false;
      this.show.board = true;
    },
    resetGame: function () {
      this.show.board = false;
      this.warning.display = false;
      this.winningPlayer = "";
      this.playerTurn = "X";
      this.squaresOccupied = 0;
      this.potentialWinner = [true, true];
      this.boardSquareValues = Array(
        this.input.boardSize * this.input.boardSize
      ).fill("");
      this.show.board = true;
    },
    backToSelection: function () {
      this.show.board = false;
      this.warning.display = false;
      this.show.input = true;
      this.input.boardSize = 3;
    },
    displayRuleWarning: function (value) {
      if (value == 4 || value == 5) {
        this.warning.display = true;
        this.warning.message =
          "Selecting this game mode hijacks the orignal tic-tac-toe and makes similar to connect 3 on a smaller scale.";
      } else {
        this.warning.display = false;
        this.warning.message = "";
      }
    },
    checkDraw: function () {
      ["X", "O"].forEach((player) => {
        let draw = true;
        this.winLines.every((winline) => {
          let canWin = 0;
          winline.every((winSquare) => {
            if (
              this.boardSquareValues[winSquare] != player &&
              this.boardSquareValues[winSquare] != ""
            ) {
              return false;
            }
            canWin++;
            return true;
          });
          if (canWin == 3) {
            draw = false;
          }
          return true;
        });

        if (draw) {
          if (player == "X") {
            this.potentialWinner[0] = false;
          } else if (player == "O") {
            this.potentialWinner[1] = false;
          }
        }
      });

      if (
        (!this.potentialWinner[0] && !this.potentialWinner[1]) ||
        (this.squaresOccupied ==
          this.input.boardSize * this.input.boardSize - 2 &&
          !(this.potentialWinner[0] && this.potentialWinner[1]))
      ) {
        this.potentialWinner[0] = false;
        this.potentialWinner[1] = false;
        return true;
      }

      return false;
    },
    checkWinner: function () {
      this.winLines.every((winLine) => {
        let player = this.boardSquareValues[winLine[0]];
        let completedLine = 0;
        winLine.every((winSquare) => {
          if (player == "") {
            return false;
          }

          if (player == this.boardSquareValues[winSquare]) {
            completedLine++;
            return true;
          }
          return false;
        });
        if (completedLine == 3) {
          this.winningPlayer = player;
          return false;
        }
        return true;
      });

      if (this.winningPlayer != "") {
        return true;
      }

      return false;
    },
    dropValue: function (index) {
      this.warning.display = false;

      let rem = index % this.input.boardSize;
      for (let x = 0; x < this.input.boardSize; x++) {
        if (
          this.boardSquareValues[
            (this.input.boardSize - x) * this.input.boardSize -
              (this.input.boardSize - rem)
          ] == ""
        ) {
          this.squaresOccupied++;
          this.boardSquareValues[
            (this.input.boardSize - x) * this.input.boardSize -
              (this.input.boardSize - rem)
          ] = this.playerTurn;
          this.changePlayer();
          x = this.input.boardSize;
        }
        if (x == this.input.boardSize - 1) {
          this.warning.display = true;
          this.warning.message =
            "Player " +
            this.playerTurn +
            " cannot select an already full column!";
        }
      }
    },
    checkFilled: function (index) {
      if (this.boardSquareValues[index] != "") {
        this.warning.display = true;
        this.warning.message =
          "Player " +
          this.playerTurn +
          " cannot select an already occupied square!";
      } else {
        this.squaresOccupied++;
        this.boardSquareValues[index] = this.playerTurn;
        this.changePlayer();
      }
    },
    winLinesCalc: function () {
      let boardSize = parseInt(this.input.boardSize, 10);
      //let lines = [];
      let combinationsTotal = 0;
      if (boardSize == 3) {
        combinationsTotal = 1;
      } else {
        combinationsTotal = boardSize - 2;
      }

      //horizontal -
      for (let x = 0; x <= (boardSize - 1) * boardSize; x += boardSize) {
        let startingIndex = x;
        for (let y = 0; y < combinationsTotal; y++) {
          this.winLines.push([
            startingIndex,
            startingIndex + 1,
            startingIndex + 2,
          ]);
          startingIndex++;
        }
      }

      //vertical |
      for (let x = 0; x < boardSize; x++) {
        let startingIndex = x;
        for (let y = 0; y < combinationsTotal; y++) {
          this.winLines.push([
            startingIndex,
            startingIndex + boardSize,
            startingIndex + boardSize * 2,
          ]);
          startingIndex += boardSize;
        }
      }

      // across - diagonal / \
      for (let x = 0; x < boardSize - 2; x++) {
        let startingIndex = x;
        for (let y = 0; y < combinationsTotal; y++) {
          let startingIndexRem = startingIndex % boardSize;

          let startingIndexInt = Math.floor(startingIndex / boardSize);

          this.winLines.push([
            startingIndex,
            startingIndex + boardSize + 1,
            startingIndex + boardSize * 2 + 2,
          ]);

          this.winLines.push([
            boardSize * startingIndexInt + boardSize - 1 - startingIndexRem,
            boardSize * startingIndexInt +
              boardSize -
              1 -
              startingIndexRem +
              (boardSize - 1),
            boardSize * startingIndexInt +
              boardSize -
              1 -
              startingIndexRem +
              (boardSize * 2 - 2),
          ]);

          startingIndex += boardSize + 1;
        }
        combinationsTotal--;
      }

      // down | diagonal \
      combinationsTotal = boardSize - 3;
      for (let x = boardSize; x < (boardSize - 2) * boardSize; x += boardSize) {
        for (let y = 0; y < combinationsTotal; y++) {
          this.winLines.push([
            (y + 1) * x + y,
            (y + 1) * x + y + boardSize + 1,
            (y + 1) * x + y + boardSize * 2 + 2,
          ]);

          let indexRem = ((y + 1) * x + y) % boardSize;

          let indexInt = Math.floor(((y + 1) * x + y) / boardSize);

          this.winLines.push([
            boardSize * indexInt + boardSize - 1 - indexRem,
            boardSize * indexInt + boardSize - 1 - indexRem + (boardSize - 1),
            boardSize * indexInt +
              boardSize -
              1 -
              indexRem +
              (boardSize * 2 - 2),
          ]);
        }
        combinationsTotal--;
      }
    },
    changePlayer: function () {
      if (this.playerTurn == "X") {
        this.playerTurn = "O";
      } else {
        this.playerTurn = "X";
      }
    },
    squareClicked: function (clickedSquare) {
      this.warning.display = false;
      this.warning.message = "";

      if (this.input.boardSize != 3) {
        this.dropValue(clickedSquare);
      } else {
        this.checkFilled(clickedSquare);
      }

      if (this.checkWinner()) {
        alert(
          "Winner Winner Chicken Dinner Player " + this.winningPlayer + "!"
        );
        this.reset();
        //location.reload();
      } else {
        if (this.checkDraw()) {
          alert("Unlucky Chucky its a Draw!");
          this.reset();
          //location.reload();
        }
      }
    },
  },
};
</script>

<style>
#tic-tac-toe-board {
  display: flex;
  justify-content: center;
}
.warning {
  color: red;
}
</style>