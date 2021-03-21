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

  // Inspect
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
});
