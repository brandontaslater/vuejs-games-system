<template>
  <div id="game">
    <h1>Tic Tac Toe</h1>
    <h3 class="warning" v-show="warning.display">{{ warning.message }}</h3>
    <div id="tic-tac-toe-board">
      <board
        :boardSquareValues="this.boardSquareValues"
        v-on:squareClicked="squareClicked"
        :playerTurn="playerTurn"
      ></board>
    </div>
    <button>Reset Board</button>
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
      boardSquareValues: Array(9).fill(""),
      playerTurn: "X",
      winningPlayer: "",
      winLines: this.winLinesCalc(),
      warning: {
        display: false,
        message: "",
      },
      potentialWinner: [true, true],
      squaresOccupied: 0,
    };
  },
  created() {},
  computed: {},
  methods: {
    checkDraw: function () {
      ["X", "O"].forEach((player) => {
        console.log("Looking for potential wins for: player " + player);
        let blockedLines = 0; //8 max
        let draw = true;
        this.winLines.every((winline) => {
          let canWin = 0;
          winline.every((winSquare) => {
            if (
              this.boardSquareValues[winSquare] != player &&
              this.boardSquareValues[winSquare] != ""
            ) {
              console.log("blocked line");
              console.log(winline);
              blockedLines++;
              return false;
            }
            canWin++;
            return true;
          });
          if (canWin == 3) {
            draw = false;
            console.log("blockedLines: " + blockedLines);
            console.log("can win");
            console.log(winline);
          }
          return true;
        });
        if (player == "X") {
          if (
            draw ||
            (this.playerTurn == "O" &&
              blockedLines >= 7 &&
              this.squaresOccupied >= 7)
          ) {
            this.potentialWinner[0] = false;
          }
        } else if (player == "O") {
          if (
            draw ||
            (this.playerTurn == "X" &&
              blockedLines >= 7 &&
              this.squaresOccupied >= 7)
          ) {
            this.potentialWinner[1] = false;
          }
        }
        console.log(this.squaresOccupied);
        console.log("blockedLines: " + blockedLines);
        console.log("DRAW: " + draw);
      });

      if (!this.potentialWinner[0] && !this.potentialWinner[1]) {
        return true;
      }

      return false;
    },
    checkWinner: function () {
      this.winLines.every((winLine) => {
        let player = this.boardSquareValues[winLine[0]];
        let completedLine = 0;
        winLine.every((winSquare) => {
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
      return [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
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

      this.checkFilled(clickedSquare);

      if (this.checkWinner()) {
        alert(
          "Winner Winner Chicken Dinner Player " + this.winningPlayer + "!"
        );
        location.reload();
      } else {
        if (this.checkDraw()) {
          alert("Unlucky Chucky its a Draw!");
          //location.reload();
        }
      }

      console.log("squares occupied: " + this.squaresOccupied);
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