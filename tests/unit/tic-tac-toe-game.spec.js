import { createLocalVue, shallowMount } from "@vue/test-utils";
import TicTacToeGame from "../../src/view/TicTacToeGame.vue";

describe("Testing TicTacToeGame", () => {
  // Inspect component can be rendered
  it("Rendered vue instance", () => {
    const wrapper = shallowMount(TicTacToeGame);
    expect(wrapper.vm).toBeTruthy();
  });

  // Inspect the raw component options
  it("Data is rendered as function", () => {
    expect(typeof TicTacToeGame.data).toBe("function");
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
