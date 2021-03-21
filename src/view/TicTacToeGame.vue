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
    /*
    The following initialise method is invoked to 
    correctly set parameters for the tic-tac-toe game.
    */
    initialise: function () {
      this.warning.display = false;
      this.winningPlayer = "";
      this.playerTurn = "X";
      this.squaresOccupied = 0;
      this.potentialWinner = [true, true];

      // Sets all squares to empty strings
      this.boardSquareValues = Array(
        this.input.boardSize * this.input.boardSize
      ).fill("");

      this.winLinesCalc();
      this.show.input = false;
      this.show.board = true;
    },

    /*
    The following resetGame method is invoked by 
    the reset button.

    Provides players the abilty to reset the game 
    at any point of play.
    */
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

    /*
    The following backToSelection method is invoked by 
    the back button.
    
    Provides players the ability to go back and select
    a different game mode.
    */
    backToSelection: function () {
      this.show.board = false;
      this.warning.display = false;
      this.show.input = true;
      this.input.boardSize = 3;
    },

    /*
    The following displayRuleWarning is invoked by 
    the selection of a non standard game mode.

    Alerts players that the game selected wont be 
    the traditional tic-tac-toe.
    */
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

    /*
    The following checkDraw method is invoked after
    every square box click that hasnt been filled.

    Provides a way for checking if players has found 
    themselves in a draw situation.

    Works on all types of board sizes.
    */
    checkDraw: function () {
      // Iterate through both players independant of whos go it is
      ["X", "O"].forEach((player) => {
        let draw = true;
        // Iterates through all possible win lines, e.g. (Standard 3x3 = 8 win lines)
        this.winLines.every((winline) => {
          // incremental counter for identifying whether a player can still win.
          let canWin = 0;
          // Iterates through all indexs in the win line e.g. (Stanard 3x3 = ["0", "1", "2"])
          winline.every((winSquare) => {
            // checks to see whether a different player is found in the win line index
            if (
              this.boardSquareValues[winSquare] != player &&
              this.boardSquareValues[winSquare] != ""
            ) {
              /* 
              No need to check the rest because the win line 
              is being blocked by another player.
              */
              return false;
            }

            canWin++;
            return true;
          });

          // if 3 indexs are found to be empty or not being blocked by opponent draw not possible
          if (canWin == 3) {
            draw = false;
          }
          return true;
        });

        // current player loop has found it to be in draw, individual win isnt possible.
        if (draw) {
          if (player == "X") {
            this.potentialWinner[0] = false;
          } else if (player == "O") {
            this.potentialWinner[1] = false;
          }
        }
      });

      /*
      Correctly identifying if the board states a draw.

      when 2 spaces are left and either: both players still have a chance of 
      winning or its a draw, due to the player who can win will need to fill 
      the last 2 squared to win.

      returns true for a DRAW
      */
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

    /*
    The following checkWinning method is invoked on every 
    square click and checks to see if any player has won.
    */
    checkWinner: function () {
      // iterates over all winning lines
      this.winLines.every((winLine) => {
        // set the player to check to the first index of the winning line.
        let player = this.boardSquareValues[winLine[0]];
        // counter for 3 in a row.
        let completedLine = 0;
        // if the value is empty no need to check
        if (player != "") {
          // iterate of each index of the win line.
          winLine.every((winSquare) => {
            if (player == this.boardSquareValues[winSquare]) {
              completedLine++;
              return true;
            }
            /*
            if the player is not equal to the next win line index no 
            need to continue looping - exit current every loop.
            */
            return false;
          });
        }

        // found winner
        if (completedLine == 3) {
          this.winningPlayer = player;
          /*
          no longer need keep iterating if winner found, 
          exit main every loop.
          */
          return false;
        }
        return true;
      });

      if (this.winningPlayer != "") {
        return true;
      }

      return false;
    },

    /*
    The following dropValue method is invoked in the hijacked game modes,
    'Medium' & 'Large'.

    Takes the current index of the clicked square and works out the
    column that was clicked, then places said player icon in the last 
    clear square in the column.
    */
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

    /*
    The following checkFilled method is invoked on every click 
    in the standard mode for checking is the square clicked is empty.
    */
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

    /*
    The following method is invoked at the 
    start of the game setup.

    Has the possibility to identify infinite
    amount of win lines for any sized board.
    */
    winLinesCalc: function () {
      let boardSize = parseInt(this.input.boardSize, 10);
      /*
      The number of combinations is the maxiumn number of win lines 
      possible over the length of the board.

      The does change however for diagonal win lines, due to the lengths 
      of diagonal lines being different in sizes depending on which angle 
      they are.
      */
      let combinationsTotal = 0;
      if (boardSize == 3) {
        combinationsTotal = 1;
      } else {
        combinationsTotal = boardSize - 2;
      }

      /*
      Calculates all of the win lines horrizonally.

      Adds new winline to the Data.winLines array.
      */
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

      /*
      Calculates all of the win lines vertically.

      Adds new winline to the Data.winLines array.
      */
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

      /*
      Calculates all of the win lines going diagonally from the first row

      becasue dealing with a square these lines can be mapped symetrically.

      Adds new winline to the Data.winLines array.
      */
      for (let x = 0; x < boardSize - 2; x++) {
        let startingIndex = x;
        for (let y = 0; y < combinationsTotal; y++) {
          let startingIndexRem = startingIndex % boardSize;

          let startingIndexInt = Math.floor(startingIndex / boardSize);

          // WINLINE
          this.winLines.push([
            startingIndex,
            startingIndex + boardSize + 1,
            startingIndex + boardSize * 2 + 2,
          ]);

          // Calculates the symetrical win line of the one above *WINLINE*
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

      /*
      Calculates all of the win lines going diagonally from the first column,
      without duplicating any existing win lines, by only selecting none 
      existent index values for win lines

      becasue dealing with a square these lines can be mapped symetrically.

      Adds new winline to the Data.winLines array.
      */
      combinationsTotal = boardSize - 3;
      for (let x = boardSize; x < (boardSize - 2) * boardSize; x += boardSize) {
        for (let y = 0; y < combinationsTotal; y++) {
          let indexRem = ((y + 1) * x + y) % boardSize;
          let indexInt = Math.floor(((y + 1) * x + y) / boardSize);

          // WINLINE
          this.winLines.push([
            (y + 1) * x + y,
            (y + 1) * x + y + boardSize + 1,
            (y + 1) * x + y + boardSize * 2 + 2,
          ]);

          // Calculates the symetrical win line of the one above *WINLINE*
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

    /*
    The following changePlayer method is invoked 
    after no winner or draw is found.

    Sets data.playerTurn to new player.
    */
    changePlayer: function () {
      if (this.playerTurn == "X") {
        this.playerTurn = "O";
      } else {
        this.playerTurn = "X";
      }
    },

    /*
    The following squareClicked method is invoked 
    through an emit from the child component Board.

    Handles the calls for inserting X/O values and
    finding a winner or draw.

    'clickedSquare': number: representing the index 
      of the square clicked.
    */
    squareClicked: function (clickedSquare) {
      this.warning.display = false;
      this.warning.message = "";

      /* 
      whether to use default tic tac toe mechanics 
      or hijack them to simulate a drop
      */
      // start ----
      if (this.input.boardSize != 3) {
        this.dropValue(clickedSquare);
      } else {
        this.checkFilled(clickedSquare);
      }
      // end ----

      if (this.checkWinner()) {
        alert(
          "Winner Winner Chicken Dinner Player " + this.winningPlayer + "!"
        );
        this.resetGame();
        //location.reload();
      } else {
        if (this.checkDraw()) {
          alert("Unlucky Chucky its a Draw!");
          this.resetGame();
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