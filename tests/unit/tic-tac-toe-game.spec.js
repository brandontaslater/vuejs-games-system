import { createLocalVue, shallowMount } from "@vue/test-utils";
import TicTacToeGame from "../../src/view/TicTacToeGame.vue";

describe("Testing TicTacToeGame", () => {
  it("Rendered vue instance", () => {
    const wrapper = shallowMount(TicTacToeGame);
    expect(wrapper.vm).toBeTruthy();
  });

  it("Data is rendered as function", () => {
    expect(typeof TicTacToeGame.data).toBe("function");
  });

  describe("Reset board game on 'Standard' | '3 by 3'", () => {
    const wrapper = shallowMount(TicTacToeGame);
    wrapper.vm.initialise();
    wrapper.vm.input.boardSize = 3;
    it("Set warning display (false): ", () => {
      expect(wrapper.vm.warning.display).toBe(false);
    });
    it("Set warning message empty: ", () => {
      expect(wrapper.vm.warning.message).toBe("");
    });
    it("Set winning player to empty: ", () => {
      expect(wrapper.vm.winningPlayer).toBe("");
    });
    it("Set player turn to X: ", () => {
      expect(wrapper.vm.playerTurn).toBe("X");
    });
    it("Set spaces occupied to 0: ", () => {
      expect(wrapper.vm.squaresOccupied).toBe(0);
    });
    it("Set potential winners to [x = true, O = true]: ", () => {
      expect(wrapper.vm.potentialWinner).toStrictEqual([true, true]);
    });
    it("Set all board values to empty: ", () => {
      expect(wrapper.vm.boardSquareValues).toStrictEqual(
        Array(wrapper.vm.input.boardSize * wrapper.vm.input.boardSize).fill("")
      );
    });
    it("Display board game: ", () => {
      expect(wrapper.vm.show.board).toBe(true);
    });
  });

  describe("Initialise board game on 'Standard' | '3 by 3'", () => {
    const wrapper = shallowMount(TicTacToeGame);
    wrapper.vm.initialise();
    wrapper.vm.input.boardSize = 3;
    it("Set warning display (false): ", () => {
      expect(wrapper.vm.warning.display).toBe(false);
    });
    it("Set warning message empty: ", () => {
      expect(wrapper.vm.warning.message).toBe("");
    });
    it("Set winning player to empty: ", () => {
      expect(wrapper.vm.winningPlayer).toBe("");
    });
    it("Set player turn to X: ", () => {
      expect(wrapper.vm.playerTurn).toBe("X");
    });
    it("Set spaces occupied to 0: ", () => {
      expect(wrapper.vm.squaresOccupied).toBe(0);
    });
    it("Set potential winners to [x = true, O = true]: ", () => {
      expect(wrapper.vm.potentialWinner).toStrictEqual([true, true]);
    });
    it("Set all board values to empty: ", () => {
      expect(wrapper.vm.boardSquareValues).toStrictEqual(
        Array(wrapper.vm.input.boardSize * wrapper.vm.input.boardSize).fill("")
      );
    });
    it("Remove select mode board: ", () => {
      expect(wrapper.vm.show.input).toBe(false);
    });
    it("Display board game: ", () => {
      expect(wrapper.vm.show.board).toBe(true);
    });
  });

  describe("Back to mode selection", () => {
    const wrapper = shallowMount(TicTacToeGame);
    wrapper.vm.backToSelection();
    it("Remove board component from view (true): ", () => {
      expect(wrapper.vm.show.board).toBe(false);
    });
    it("Set warning message (false): ", () => {
      expect(wrapper.vm.warning.display).toBe(false);
    });
    it("Display selection board (true): ", () => {
      expect(wrapper.vm.show.input).toBe(true);
    });
    it("Set default boardsize (3): ", () => {
      expect(wrapper.vm.input.boardSize).toBe(3);
    });
  });

  describe("Different modes warning message", () => {
    describe("Game mode standard; (warning false)", () => {
      let boardMode = 3;

      const wrapper = shallowMount(TicTacToeGame);

      wrapper.vm.warning.display = false;
      wrapper.vm.warning.message = "";

      wrapper.vm.displayRuleWarning(boardMode);

      it("Display warning message about game mode: ", () => {
        expect(wrapper.vm.warning.display).toBe(false);
        expect(wrapper.vm.warning.message).toBe("");
      });
    });
    describe("Game mode medium; (warning true)", () => {
      let boardMode = 4;

      const wrapper = shallowMount(TicTacToeGame);

      wrapper.vm.warning.display = false;
      wrapper.vm.warning.message = "";

      wrapper.vm.displayRuleWarning(boardMode);

      it("Display warning message about game mode: ", () => {
        expect(wrapper.vm.warning.display).toBe(true);
        expect(wrapper.vm.warning.message).toBe(
          "Selecting this game mode hijacks the orignal tic-tac-toe and makes similar to connect 3 on a smaller scale."
        );
      });
    });
    describe("Game mode large; (warning true)", () => {
      let boardMode = 5;

      const wrapper = shallowMount(TicTacToeGame);

      wrapper.vm.warning.display = false;
      wrapper.vm.warning.message = "";

      wrapper.vm.displayRuleWarning(boardMode);

      it("Display warning message about game mode: ", () => {
        expect(wrapper.vm.warning.display).toBe(true);
        expect(wrapper.vm.warning.message).toBe(
          "Selecting this game mode hijacks the orignal tic-tac-toe and makes similar to connect 3 on a smaller scale."
        );
      });
    });
  });

  describe("Checking if space is free", () => {
    describe(`Index 4;
        Board: 
            |   |  
          ---------
            |   |  
          ---------
          X | O | X`, () => {
      let testingIndex = 4;

      const wrapper = shallowMount(TicTacToeGame);

      wrapper.vm.input.boardSize = 3;
      wrapper.vm.playerTurn = "O";
      wrapper.vm.squaresOccupied = 3;
      wrapper.vm.boardSquareValues = ["", "", "", "", "", "", "X", "O", "X"];
      wrapper.vm.checkFilled(testingIndex);
      it("Squares Occupied Incremented by 1: ", () => {
        expect(wrapper.vm.squaresOccupied).toBe(4);
      });
      it("Filled Position Correctly with O: ", () => {
        expect(wrapper.vm.boardSquareValues[testingIndex]).toBe("O");
      });
      it("Changed Player Correctly to X: ", () => {
        expect(wrapper.vm.playerTurn).toBe("X");
      });
    });

    describe(`Index 8;
        Board: 
            |   |  
          ---------
            |   |  
          ---------
          X | O | X`, () => {
      let testingIndex = 8;

      const wrapper = shallowMount(TicTacToeGame);

      wrapper.vm.input.boardSize = 3;
      wrapper.vm.playerTurn = "O";
      wrapper.vm.squaresOccupied = 3;
      wrapper.vm.boardSquareValues = ["", "", "", "", "", "", "X", "O", "X"];
      wrapper.vm.checkFilled(testingIndex);
      it("Squares occupied incremented stayed the same: ", () => {
        expect(wrapper.vm.squaresOccupied).toBe(3);
      });
      it("Didnt fill the position: ", () => {
        expect(wrapper.vm.boardSquareValues[testingIndex]).toBe("X");
      });
      it("Dicnt change player to X: ", () => {
        expect(wrapper.vm.playerTurn).toBe("O");
      });
      it("Display warning message about invalid move: ", () => {
        expect(wrapper.vm.warning.display).toBe(true);
        expect(wrapper.vm.warning.message).toBe(
          "Player O cannot select an already occupied square!"
        );
        wrapper.vm.warning.display = false;
        wrapper.vm.warning.message = "";
      });
    });
  });

  // Inspect the generation of all possible winninig lines
  describe("Correct winninig lines generated", () => {
    it("'Standard' mode selected, 8 lines", () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 3;
      wrapper.vm.winLinesCalc();
      expect(wrapper.vm.winLines.length).toBe(8);
    });

    it("'Medium' mode selected, 24 lines", () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 4;
      wrapper.vm.winLinesCalc();
      expect(wrapper.vm.winLines.length).toBe(24);
    });

    it("'Large' mode selected, 48 lines", () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 5;
      wrapper.vm.winLinesCalc();
      expect(wrapper.vm.winLines.length).toBe(48);
    });
  });

  //
  describe("Correctly identifing a winner and draw", () => {
    it(`Identify a winner with 'winLinesCalc' method;
        Board: 
            X | X | O 
            --\------
            O | X | O
            ------\--
            X | O | X
            `, () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 3;
      wrapper.vm.boardSquareValues = [
        "X",
        "X",
        "O",
        "O",
        "X",
        "O",
        "X",
        "O",
        "X",
      ];
      wrapper.vm.winLinesCalc();

      expect(wrapper.vm.checkWinner()).toBe(true);
    });

    it(`Identifyig a draw with 'checkDraw' method;        
        Board: 
            X | O | X 
            ---------
              | O | X
            ---------
              | X | O
        `, () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 3;
      wrapper.vm.boardSquareValues = [
        "X",
        "O",
        "X",
        "",
        "O",
        "X",
        "",
        "X",
        "O",
      ];
      wrapper.vm.squaresOccupied = 7;
      wrapper.vm.winLinesCalc();

      expect(wrapper.vm.checkDraw()).toBe(true);
    });

    it(`'Standard' game mode selected, X wins;
        Board: 
            X | X | O 
            --\------
            O | X | O
            ------\--
            X | O | X
        `, () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 3;
      wrapper.vm.boardSquareValues = [
        "X",
        "X",
        "O",
        "O",
        "X",
        "O",
        "X",
        "O",
        "X",
      ];
      wrapper.vm.winLinesCalc();
      wrapper.vm.checkWinner();
      expect(wrapper.vm.winningPlayer).toBe("X");
    });

    it(`'Standard' game mode selected, O wins;
        Board: 
            X | X | O 
            --------\
            O | X | O
            --------\
            X |   | O
        `, () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 3;
      wrapper.vm.boardSquareValues = [
        "X",
        "x",
        "O",
        "O",
        "X",
        "O",
        "X",
        "",
        "O",
      ];
      wrapper.vm.winLinesCalc();
      wrapper.vm.checkWinner();
      expect(wrapper.vm.winningPlayer).toBe("O");
    });

    it(`'Standard' game mode selected, draw found;
        Board: 
            X | O | X 
            ---------
              | O | X
            ---------
              | X | O
        `, () => {
      const wrapper = shallowMount(TicTacToeGame);
      wrapper.vm.input.boardSize = 3;
      wrapper.vm.boardSquareValues = [
        "X",
        "O",
        "X",
        "",
        "O",
        "X",
        "",
        "X",
        "O",
      ];
      wrapper.vm.squaresOccupied = 7;
      wrapper.vm.winLinesCalc();
      wrapper.vm.checkDraw();
      expect(wrapper.vm.potentialWinner[0]).toBe(false);
      expect(wrapper.vm.potentialWinner[1]).toBe(false);
    });
  });
});
