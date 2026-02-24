// Exercise 1: GameConfig (1.5p)
export class GameConfig {
  constructor() {
    this.size = 6;
    this.mines = 5;
    this.sizeInput = null;
    this.minesInput = null;
  }

  initialize() {
    this.sizeInput = document.querySelectorAll('input[name="size"]');
    this.minesInput = document.getElementById("mines");

    this.sizeInput.forEach((radio) => {
      radio.addEventListener("change", (event) => {
        this.size = parseInt(event.target.value);
        this.updateMines();
      });
    });

    this.minesInput.addEventListener("change", () => {
      this.updateMines();
    });
  }

  updateMines() {
    const inputValue = parseInt(this.minesInput.value);
    const maxMines = this.size * this.size - 1;
    const validatedValue = Math.min(Math.max(inputValue, 1), maxMines);
    this.mines = validatedValue;
    this.minesInput.value = validatedValue;
  }
}

// Exercise 2: Board (2p)
export class Board {
  constructor(gameConfig) {
    this.size = gameConfig.size;
    this.mines = gameConfig.mines;
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(0),
    );
  }

  generate() {
    let minesCount = 0;
    while (minesCount < this.mines) {
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);

      if (this.board[row][col] !== -1) {
        this.board[row][col] = -1;
        minesCount++;
      }
    }

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] != -1) {
          let minesNear = 0;
          for (let drow = -1; drow <= 1; drow++) {
            for (let dcol = -1; dcol <= 1; dcol++) {
              const nrow = row + drow;
              const ncol = col + dcol;

              if (
                nrow >= 0 &&
                nrow < this.size &&
                ncol >= 0 &&
                ncol < this.size &&
                this.board[nrow][ncol] === -1
              ) {
                minesNear++;
              }
            }
          }
          this.board[row][col] = minesNear;
        }
      }
    }
  }
}

// Exercise 3: GameLogic (2.5 )
export class GameLogic {
  constructor(board) {
    this.board = board;
    this.revealed = new Set();
    this.gameOver = false;
    this.hasWon = false;
  }

  checkWin() {
    const totalCells = this.board.size * this.board.size;
    const nonMineCells = totalCells - this.board.mines;

    this.hasWon = this.revealed.size === nonMineCells;
    if (this.hasWon) {
      this.gameOver = true;
    }

    return this.hasWon;
  }

  revealCell(row, col) {
    const key = `${row},${col}`;

    if (this.gameOver) {
      return false;
    }

    if (this.revealed.has(key)) {
      return false;
    }

    if (this.board.board[row][col] === -1) {
      for (let x = 0; x < this.board.size; x++) {
        for (let y = 0; y < this.board.size; y++) {
          const key = `${x},${y}`;
          this.revealed.add(key);
        }
      }
      this.gameOver = true;
      this.hasWon = false;
      return true;
    }
    this.revealNearCell(row, col);
    this.checkWin();
    return false;
  }

  revealNearCell(row, col) {
    const key = `${row},${col}`;

    if (this.revealed.has(key)) {
      return;
    }

    if (
      row < 0 ||
      row >= this.board.size ||
      col < 0 ||
      col >= this.board.size
    ) {
      return;
    }

    this.revealed.add(key);

    if (this.board.board[row][col] === 0) {
      for (let drow = -1; drow <= 1; drow++) {
        for (let dcol = -1; dcol <= 1; dcol++) {
          const nrow = row + drow;
          const ncol = col + dcol;

          if (
            (drow !== 0 || dcol !== 0) &&
            nrow >= 0 &&
            nrow < this.board.size &&
            ncol >= 0 &&
            ncol < this.board.size &&
            !this.revealed.has(nrow, ncol)
          ) {
            this.revealNearCell(nrow, ncol);
          }
        }
      }
    }
  }
}

export class UI {
  // Exercise 4.1: UI (1.5 points)
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
    this.gameBoard = document.getElementById("game-board");
  }

  renderBoard() {
    this.gameBoard.innerHTML = "";
    let size = this.gameLogic.board.size;
    this.gameBoard.className = `game-board size-${size}`;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.row = row;
        div.dataset.col = col;

        div.addEventListener("click", (event) => {
          this.handleCellClick(row, col);
        });

        this.gameBoard.appendChild(div);
      }
    }
  }

  handleCellClick(row, col) {
    let mine = this.gameLogic.revealCell(row, col);
    this.updateBoard();
    if (mine) {
      this.showGameStatus(false);
    } else if (this.gameLogic.hasWon) {
      this.showGameStatus(true);
    }
  }

  // Exercise 4.2: UI (1 points)
  showGameStatus(status) {
    const div = document.createElement("div");
    div.id = "game-status";
    if (status) {
      div.textContent = "You won!";
    } else {
      div.textContent = "You lost!";
    }

    document.body.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 5000);
  }

  updateBoard() {
    const cells = this.gameBoard.querySelectorAll(".cell");
    cells.forEach((cell) => {
      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10);
      const key = `${row},${col}`;

      if (this.gameLogic.revealed.has(key)) {
        cell.classList.add("revealed");
        const value = this.gameLogic.board.board[row][col];

        if (value === -1) {
          cell.classList.add("mine");
          cell.textContent = "💣";
        } else if (value === 0) {
          cell.textContent = "";
        } else {
          cell.textContent = value.toString();
        }
      }
    });
  }
}

// Exercise 5: Game (1.5 points)
export class Game {
  constructor() {
    this.config = null;
    this.board = null;
    this.gameLogic = null;
    this.ui = null;
  }

  start() {
    this.config = new GameConfig();
    this.config.initialize();

    const button = document.createElement("button");
    button.id = "generate";
    button.textContent = "Generate Game";

    const div_config = document.getElementsByClassName("config")[0];
    div_config.appendChild(button);

    button.addEventListener("click", (event) => {
      this.board = new Board(this.config);
      this.board.generate();

      this.gameLogic = new GameLogic(this.board);

      this.ui = new UI(this.gameLogic);
      this.ui.renderBoard();
    });
  }
}
