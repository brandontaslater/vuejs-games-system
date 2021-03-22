# Games System

A simple implementation of a games system.

## Tic Tac Toe

TcTacToe written in VueJs.

## Installation
From within the project folder open up a console of choice.
- npm install

## Serving the App
From within the project folder open up a console of choice.
- npm run serve

## Unit Testing (Jest)
From within the project folder open up a console of choice.
- npm run test 

Serveral unit tests have been provided to test the core functionality of the game.
Core Tests include:
- Rendering the main game component.
- Rendering the components data object.
- Reset button for resetting the board.
- Inititalising the board game for standard 3 by 3 mode.
- Back button for going back to mode selection view.
- Modes warning messages generation.
- Identifying if a space is free.
- The generation of winning lines being correct: Standard, Medium, Large.
- The win function correctly identifying a winner.
- The win function correctly identify which player has won.
- The draw function correctly identifying a draw.

(These tests only simulate a shallow mount for the the 'TicTacToeGame.vue' component, if additional tests are required for the 'Board.vue' or 'Square.vue' i can complete on request.)

## Additional Comments About the App
The app is soley built around the traditional 3 by 3 logic of tic-tac-toe, but also demonstates the ability to creating generic functions which can be transmutable between different end goals.

Please enjoy.

Source code is free to use and distribute.
