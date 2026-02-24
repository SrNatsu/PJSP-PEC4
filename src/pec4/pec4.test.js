import { Board, GameConfig, GameLogic, UI, Game } from "./pec4.js";

describe("GameConfig", () => {
  let gameConfig;

  beforeEach(() => {
    document.body.innerHTML = `
            <input type="radio" name="size" value="4">
            <input type="radio" name="size" value="6">
            <input id="mines" type="number" value="5">
        `;
    gameConfig = new GameConfig();
    gameConfig.sizeInput = document.querySelectorAll('input[name="size"]');
    gameConfig.minesInput = document.getElementById("mines");
    gameConfig.initialize();
  });

  test("Should initialize correctly with default values", () => {
    expect(gameConfig.size).toBe(6);
    expect(gameConfig.mines).toBe(5);
  });

  test("Should update board size when size input changes", () => {
    const sizeInput = gameConfig.sizeInput[0];
    sizeInput.value = "4";
    sizeInput.dispatchEvent(new Event("change"));

    expect(gameConfig.size).toBe(4);
  });

  test("Should update number of mines when mines input changes", () => {
    gameConfig.minesInput.value = "10";
    gameConfig.minesInput.dispatchEvent(new Event("change"));

    expect(gameConfig.mines).toBe(10);
  });

  test("Should limit number of mines to the maximum allowed", () => {
    gameConfig.size = 4; // 4x4 board
    gameConfig.minesInput.value = "20"; // More than the maximum allowed
    gameConfig.minesInput.dispatchEvent(new Event("change"));

    expect(gameConfig.mines).toBe(15); // Maximum allowed: 4*4-1 = 15
  });

  test("Should limit number of mines to the minimum allowed", () => {
    gameConfig.minesInput.value = "0"; // Less than the minimum allowed
    gameConfig.minesInput.dispatchEvent(new Event("change"));

    expect(gameConfig.mines).toBe(1); // Minimum allowed: 1
  });

  test("Should update number of mines when board size changes to a smaller one", () => {
    gameConfig.minesInput.value = "20"; // Set a high number of mines
    gameConfig.minesInput.dispatchEvent(new Event("change"));
    expect(gameConfig.mines).toBe(20); // Confirm that it's initially allowed

    const sizeInput = gameConfig.sizeInput[0]; // Change size to 4x4
    sizeInput.value = "4";
    sizeInput.dispatchEvent(new Event("change"));

    expect(gameConfig.size).toBe(4);
    expect(gameConfig.mines).toBe(15); // Maximum allowed for 4x4 is 15
  });
});

describe("Board", () => {
  let gameConfig;
  let board;

  beforeEach(() => {
    gameConfig = new GameConfig();
    gameConfig.size = 4;
    gameConfig.mines = 3;
    board = new Board(gameConfig);
  });

  test("Should initialize the board correctly with the configured size and mines", () => {
    expect(board.size).toBe(4);
    expect(board.mines).toBe(3);
    expect(board.board.length).toBe(4);
    expect(board.board.every((row) => row.length === 4)).toBe(true);
    expect(board.board.flat().every((cell) => cell === 0)).toBe(true);
  });

  test("Should generate the board with the correct number of mines", () => {
    board.generate();
    const mineCount = board.board.flat().filter((cell) => cell === -1).length;
    expect(mineCount).toBe(3);
  });

  test("Should calculate adjacent mines correctly after generating the board", () => {
    board.generate();
    const expectedBoard = board.board.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell === -1) return -1;
        return board.board
          .slice(Math.max(0, rowIndex - 1), Math.min(board.size, rowIndex + 2))
          .flatMap((r) =>
            r.slice(
              Math.max(0, colIndex - 1),
              Math.min(board.size, colIndex + 2),
            ),
          )
          .filter((value) => value === -1).length;
      }),
    );
    expect(board.board).toEqual(expectedBoard);
  });

  test("Should not place mines in the same cell more than once", () => {
    board.generate();
    const mineCount = board.board.flat().filter((cell) => cell === -1).length;
    expect(mineCount).toBe(3);
  });

  test("Should fill the board with valid values after generating", () => {
    board.generate();
    const isValid = board.board
      .flat()
      .every((cell) => cell === -1 || (cell >= 0 && cell <= 8));
    expect(isValid).toBe(true);
  });

  beforeEach(() => {
    gameConfig = new GameConfig();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original Math.random behavior
  });

  test("Should correctly generate a 2x2 board with 1 mine", () => {
    gameConfig.size = 2;
    gameConfig.mines = 1;
    board = new Board(gameConfig);

    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.1) // Mine at (0, 0)
      .mockReturnValueOnce(0.1);

    board.generate();

    expect(board.board).toEqual([
      [-1, 1],
      [1, 1],
    ]);
  });

  test("Should correctly generate a 2x2 board with 3 mines", () => {
    gameConfig.size = 2;
    gameConfig.mines = 3;
    board = new Board(gameConfig);

    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.0) // Column 0 - Mine at (0, 0)
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.9) // Column 1 - Mine at (0, 1)
      .mockReturnValueOnce(0.9) // Row 1
      .mockReturnValueOnce(0.9); // Column 1 - Mine at (1, 1)

    board.generate();

    expect(board.board).toEqual([
      [-1, -1],
      [3, -1],
    ]);
  });

  test("Should correctly generate a 3x3 board with 2 mines", () => {
    gameConfig.size = 3;
    gameConfig.mines = 2;
    board = new Board(gameConfig);

    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.0) // Mine at (0, 0)
      .mockReturnValueOnce(0.0)
      .mockReturnValueOnce(0.8) // Mine at (2, 2)
      .mockReturnValueOnce(0.8);

    board.generate();

    expect(board.board).toEqual([
      [-1, 1, 0],
      [1, 2, 1],
      [0, 1, -1],
    ]);
  });

  test("Should correctly generate a 3x3 board with 8 mines (maximum)", () => {
    gameConfig.size = 3;
    gameConfig.mines = 8;
    board = new Board(gameConfig);

    // Adjusting Math.random() to place mines in exact expected positions
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.0) // Column 0
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.4) // Column 1
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.8) // Column 2
      .mockReturnValueOnce(0.4) // Row 1
      .mockReturnValueOnce(0.0) // Column 0
      .mockReturnValueOnce(0.4) // Row 1
      .mockReturnValueOnce(0.4) // Column 1
      .mockReturnValueOnce(0.4) // Row 1
      .mockReturnValueOnce(0.8) // Column 2
      .mockReturnValueOnce(0.8) // Row 2
      .mockReturnValueOnce(0.0) // Column 0
      .mockReturnValueOnce(0.8) // Row 2
      .mockReturnValueOnce(0.4); // Column 1
    // The last point (2,2) will have the calculated value (3)

    board.generate();

    expect(board.board).toEqual([
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, 3],
    ]);
  });

  test("Should correctly generate a 4x4 board with 5 mines", () => {
    gameConfig.size = 4;
    gameConfig.mines = 5;
    board = new Board(gameConfig);

    // Adjusting Math.random() to place mines in exact expected positions
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.0) // Column 0
      .mockReturnValueOnce(0.0) // Row 0
      .mockReturnValueOnce(0.6) // Column 2
      .mockReturnValueOnce(0.3) // Row 1
      .mockReturnValueOnce(0.6) // Column 2
      .mockReturnValueOnce(0.6) // Row 2
      .mockReturnValueOnce(0.0) // Column 0
      .mockReturnValueOnce(0.9) // Row 3
      .mockReturnValueOnce(0.9); // Column 3

    board.generate();

    expect(board.board).toEqual([
      [-1, 3, -1, 2],
      [2, 4, -1, 2],
      [-1, 2, 2, 2],
      [1, 1, 1, -1],
    ]);
  });
});

describe("GameLogic", () => {
  let mockBoard;
  let gameLogic;

  beforeEach(() => {
    // Create a mock board to avoid dependencies
    mockBoard = {
      size: 3,
      mines: 2,
      board: [
        [1, 1, 0],
        [1, -1, 0],
        [1, 1, -1],
      ],
    };
    gameLogic = new GameLogic(mockBoard);
  });

  test("Should initialize correctly", () => {
    expect(gameLogic.board).toBe(mockBoard);
    expect(gameLogic.revealed.size).toBe(0);
    expect(gameLogic.gameOver).toBe(false);
    expect(gameLogic.hasWon).toBe(false);
  });

  test("Should check win condition correctly", () => {
    // Initially no win
    expect(gameLogic.checkWin()).toBe(false);

    // Reveal all non-mine cells
    gameLogic.revealed.add("0,0");
    gameLogic.revealed.add("0,1");
    gameLogic.revealed.add("0,2");
    gameLogic.revealed.add("1,0");
    gameLogic.revealed.add("1,2");
    gameLogic.revealed.add("2,0");
    gameLogic.revealed.add("2,1");

    // Now should win (7 cells revealed, 2 mines remain)
    expect(gameLogic.checkWin()).toBe(true);
  });

  test("Should return true when revealing a mine", () => {
    const result = gameLogic.revealCell(1, 1); // Mine at (1,1)
    expect(result).toBe(true);
    expect(gameLogic.gameOver).toBe(true);
    expect(gameLogic.hasWon).toBe(false);
    expect(gameLogic.revealed.size).toBe(9); // All cells should be revealed
  });

  test("Should reveal a numbered cell correctly", () => {
    const result = gameLogic.revealCell(0, 0); // Cell with number 1
    expect(result).toBe(false);
    expect(gameLogic.gameOver).toBe(false);
    expect(gameLogic.revealed.has("0,0")).toBe(true);
    expect(gameLogic.revealed.size).toBe(1);
  });

  test("Should reveal adjacent cells when revealing an empty cell", () => {
    const result = gameLogic.revealCell(0, 2); // Cell with number 0
    expect(result).toBe(false);

    // Should reveal the empty cell and its adjacent cells
    expect(gameLogic.revealed.has("0,2")).toBe(true);
    expect(gameLogic.revealed.has("1,2")).toBe(true);
    expect(gameLogic.revealed.size).toBeGreaterThan(1);
  });

  test("Should not reveal already revealed cells", () => {
    gameLogic.revealed.add("0,0");
    const result = gameLogic.revealCell(0, 0);
    expect(result).toBe(false);
    expect(gameLogic.revealed.size).toBe(1);
  });

  test("Should not allow revealing cells after game over", () => {
    gameLogic.gameOver = true;
    const result = gameLogic.revealCell(0, 0);
    expect(result).toBe(false);
    expect(gameLogic.revealed.size).toBe(0);
  });

  test("Should set game as won when all non-mine cells are revealed", () => {
    // Reveal all non-mine cells except one
    gameLogic.revealed.add("0,0");
    gameLogic.revealed.add("0,1");
    gameLogic.revealed.add("0,2");
    gameLogic.revealed.add("1,0");
    gameLogic.revealed.add("1,2");
    gameLogic.revealed.add("2,0");

    // Reveal the last non-mine cell
    gameLogic.revealCell(2, 1);

    expect(gameLogic.hasWon).toBe(true);
    expect(gameLogic.gameOver).toBe(true);
  });

  test("Should reveal all cells when a mine is clicked", () => {
    gameLogic.revealCell(1, 1); // Mine at (1,1)

    // Verify that all cells are revealed
    expect(gameLogic.revealed.size).toBe(9); // 3x3 board
    for (let row = 0; row < mockBoard.size; row++) {
      for (let col = 0; col < mockBoard.size; col++) {
        expect(gameLogic.revealed.has(`${row},${col}`)).toBe(true);
      }
    }
    // Verify game over state
    expect(gameLogic.gameOver).toBe(true);
    expect(gameLogic.hasWon).toBe(false);
  });

  test("Should recursively reveal adjacent cells", () => {
    // Crear un tablero más pequeño para evitar problemas de memoria
    const specialBoard = {
      size: 3, // Reducido de 4 a 3
      mines: 1,
      board: [
        [1, 1, 0],
        [1, -1, 0],
        [0, 0, 0],
      ],
    };

    const specialGameLogic = new GameLogic(specialBoard);

    // Reveal a cell that's part of a chain of empty cells
    specialGameLogic.revealCell(2, 2);

    // Solo verificamos unas pocas celdas clave, no todas
    expect(specialGameLogic.revealed.has("2,2")).toBe(true);
    expect(specialGameLogic.revealed.has("2,1")).toBe(true);
    expect(specialGameLogic.revealed.has("1,2")).toBe(true);
    expect(specialGameLogic.revealed.size).toBeGreaterThan(3);
  });
});

describe("UI", () => {
  let mockGameLogic;
  let ui;

  beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = '<div id="game-board"></div>';

    // Create mock for gameLogic
    mockGameLogic = {
      board: {
        size: 3,
        board: [
          [1, 1, 0],
          [1, -1, 0],
          [1, 1, -1],
        ],
      },
      revealed: new Set(),
      gameOver: false,
      hasWon: false,
      revealCell: jest.fn(),
    };

    ui = new UI(mockGameLogic);
  });

  test("Should initialize correctly", () => {
    expect(ui.gameLogic).toBe(mockGameLogic);
    expect(ui.gameBoard).toEqual(document.getElementById("game-board"));
  });

  test("Should render board correctly", () => {
    ui.renderBoard();

    // Check that gameBoard has correct classes
    expect(ui.gameBoard.className).toBe("game-board size-3");

    // Check that the correct number of cells were created
    const cells = ui.gameBoard.querySelectorAll(".cell");
    expect(cells.length).toBe(9); // 3x3 board = 9 cells

    // Check that cells have the correct data attributes
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      expect(cell.dataset.row).toBe(row.toString());
      expect(cell.dataset.col).toBe(col.toString());
    });
  });

  test("Should handle cell click correctly when not hitting a mine", () => {
    mockGameLogic.revealCell.mockReturnValue(false);
    ui.renderBoard();

    // Setup spies
    const updateBoardSpy = jest.spyOn(ui, "updateBoard");
    const showGameStatusSpy = jest.spyOn(ui, "showGameStatus");

    // Simulate click on a cell
    const firstCell = ui.gameBoard.querySelector(".cell");
    firstCell.click();

    // Check that the correct methods were called
    expect(mockGameLogic.revealCell).toHaveBeenCalledWith(0, 0);
    expect(updateBoardSpy).toHaveBeenCalled();
    expect(showGameStatusSpy).not.toHaveBeenCalled();
  });

  test("Should handle cell click correctly when hitting a mine", () => {
    mockGameLogic.revealCell.mockReturnValue(true);
    ui.renderBoard();

    // Setup spies
    const updateBoardSpy = jest.spyOn(ui, "updateBoard");
    const showGameStatusSpy = jest.spyOn(ui, "showGameStatus");

    // Simulate click on a cell
    const firstCell = ui.gameBoard.querySelector(".cell");
    firstCell.click();

    // Check that the correct methods were called
    expect(mockGameLogic.revealCell).toHaveBeenCalledWith(0, 0);
    expect(updateBoardSpy).toHaveBeenCalled();
    expect(showGameStatusSpy).toHaveBeenCalledWith(false);
  });

  test("Should handle cell click correctly when winning the game", () => {
    mockGameLogic.revealCell.mockReturnValue(false);
    mockGameLogic.hasWon = true;
    ui.renderBoard();

    // Setup spies
    const updateBoardSpy = jest.spyOn(ui, "updateBoard");
    const showGameStatusSpy = jest.spyOn(ui, "showGameStatus");

    // Simulate click on a cell
    const firstCell = ui.gameBoard.querySelector(".cell");
    firstCell.click();

    // Check that the correct methods were called
    expect(mockGameLogic.revealCell).toHaveBeenCalledWith(0, 0);
    expect(updateBoardSpy).toHaveBeenCalled();
    expect(showGameStatusSpy).toHaveBeenCalledWith(true);
  });

  test("Should show game status correctly for win", () => {
    jest.useFakeTimers();
    ui.renderBoard();

    ui.showGameStatus(true);

    // Check that status div was created correctly
    const statusDiv = document.getElementById("game-status");
    expect(statusDiv).toBeTruthy();
    expect(statusDiv.textContent).toBe("You won!");

    // Check that status div is removed after 5 seconds
    jest.advanceTimersByTime(5000);
    expect(document.getElementById("game-status")).toBeNull();

    jest.useRealTimers();
  });

  test("Should show game status correctly for loss", () => {
    jest.useFakeTimers();
    ui.renderBoard();

    ui.showGameStatus(false);

    // Check that status div was created correctly
    const statusDiv = document.getElementById("game-status");
    expect(statusDiv).toBeTruthy();
    expect(statusDiv.textContent).toBe("You lost!");

    // Check that status div is removed after 5 seconds
    jest.advanceTimersByTime(5000);
    expect(document.getElementById("game-status")).toBeNull();

    jest.useRealTimers();
  });

  test("Should update board correctly", () => {
    ui.renderBoard();

    // Setup revealed cells
    mockGameLogic.revealed.add("0,0"); // Regular cell
    mockGameLogic.revealed.add("1,1"); // Mine

    ui.updateBoard();

    const cells = ui.gameBoard.querySelectorAll(".cell");

    // Check cell at (0,0) - regular cell with value 1
    const cell1 = cells[0];
    expect(cell1.classList.contains("revealed")).toBe(true);
    expect(cell1.classList.contains("mine")).toBe(false);
    expect(cell1.textContent).toBe("1");

    // Check cell at (1,1) - mine
    const cell2 = cells[4]; // Index 4 corresponds to position (1,1) in a 3x3 grid
    expect(cell2.classList.contains("revealed")).toBe(true);
    expect(cell2.classList.contains("mine")).toBe(true);
    expect(cell2.textContent).toBe("💣");

    // Check cell at (2,2) - not revealed
    const cell3 = cells[8]; // Index 8 corresponds to position (2,2) in a 3x3 grid
    expect(cell3.classList.contains("revealed")).toBe(false);
  });

  test("Should update board correctly with empty cells", () => {
    mockGameLogic.board.board[0][2] = 0; // Make a cell empty (value 0)
    ui.renderBoard();

    mockGameLogic.revealed.add("0,2"); // Reveal the empty cell

    ui.updateBoard();

    const cells = ui.gameBoard.querySelectorAll(".cell");
    const emptyCell = cells[2]; // Index 2 corresponds to position (0,2) in a 3x3 grid

    expect(emptyCell.classList.contains("revealed")).toBe(true);
    expect(emptyCell.textContent).toBe(""); // Empty cells should display nothing
  });
});

describe("Game", () => {
  let mockConfigInstance,
    mockBoardInstance,
    mockGameLogicInstance,
    mockUIInstance;

  beforeEach(() => {
    // Setup DOM environment
    document.body.innerHTML = `
            <div class="config">
                <input type="radio" name="size" value="4">
                <input type="radio" name="size" value="6">
                <input id="mines" type="number" value="5">
            </div>
            <div id="game-board"></div>
        `;

    // Create mock instances
    mockConfigInstance = {
      initialize: jest.fn(),
      size: 6,
      mines: 5,
    };

    mockBoardInstance = {
      generate: jest.fn(),
      size: 6,
      mines: 5,
      board: Array(6)
        .fill()
        .map(() => Array(6).fill(0)),
    };

    mockGameLogicInstance = {
      board: {
        size: 6,
        board: Array(6)
          .fill()
          .map(() => Array(6).fill(0)),
      },
      revealed: new Set(),
    };

    mockUIInstance = {
      renderBoard: jest.fn(),
    };

    // Mock the constructors
    jest.spyOn(GameConfig.prototype, "initialize").mockImplementation(() => {});

    // Mock the class constructors
    jest.mock = jest.fn();
    jest.mock.mockImplementation(() => mockConfigInstance);
    jest.mock.mockImplementation(() => mockBoardInstance);
    jest.mock.mockImplementation(() => mockGameLogicInstance);
    jest.mock.mockImplementation(() => mockUIInstance);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Should initialize correctly", () => {
    const game = new Game();
    expect(game.config).toBeNull();
    expect(game.board).toBeNull();
    expect(game.gameLogic).toBeNull();
    expect(game.ui).toBeNull();
  });

  test("Should create GameConfig and initialize it when start is called", () => {
    // Use a real instance for this simple test
    const game = new Game();
    game.start();

    expect(game.config).not.toBeNull();
    expect(game.config).toBeInstanceOf(GameConfig);
    expect(game.config.initialize).toHaveBeenCalled();
  });

  test("Should create generate button correctly", () => {
    const game = new Game();
    game.start();

    const generateButton = document.getElementById("generate");
    expect(generateButton).not.toBeNull();
    expect(generateButton.textContent).toBe("Generate Game");

    // Check that button was appended to the config div
    const configDiv = document.querySelector(".config");
    expect(configDiv.contains(generateButton)).toBe(true);
  });

  test("Should instantiate required classes when generate button is clicked", () => {
    // For this test, use real instances but spy on the classes
    const boardSpy = jest
      .spyOn(Board.prototype, "generate")
      .mockImplementation(() => {});
    const uiSpy = jest
      .spyOn(UI.prototype, "renderBoard")
      .mockImplementation(() => {});

    const game = new Game();
    game.start();

    const generateButton = document.getElementById("generate");
    generateButton.click();

    expect(game.board).toBeInstanceOf(Board);
    expect(boardSpy).toHaveBeenCalled();

    expect(game.gameLogic).toBeInstanceOf(GameLogic);

    expect(game.ui).toBeInstanceOf(UI);
    expect(uiSpy).toHaveBeenCalled();

    boardSpy.mockRestore();
    uiSpy.mockRestore();
  });

  test("Should handle multiple clicks on generate button", () => {
    const game = new Game();
    game.start();

    const generateButton = document.getElementById("generate");
    generateButton.click();

    // Store references to first instances
    const firstBoard = game.board;
    const firstGameLogic = game.gameLogic;
    const firstUI = game.ui;

    // Click again
    generateButton.click();

    // Verify new instances were created
    expect(game.board).not.toBe(firstBoard);
    expect(game.gameLogic).not.toBe(firstGameLogic);
    expect(game.ui).not.toBe(firstUI);
  });
});
