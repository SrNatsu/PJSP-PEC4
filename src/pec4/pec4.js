
// Exercise 1: GameConfig (1.5p)
export class GameConfig {
    constructor(){}

    initialize() {
    }

    updateMines() {
    }
}

// Exercise 2: Board (2p)
export class Board {
    constructor(gameConfig){}

    generate() { }
}

// Exercise 3: GameLogic (2.5 )
export class GameLogic {
    constructor(board){}

    checkWin(){}

    revealCell(row, col){}
}

export class UI {

    // Exercise 4.1: UI (1.5 points)
    constructor(gameLogic){}

    renderBoard(){}

    handleCellClick(row, col){}

    // Exercise 4.2: UI (1 points)
    showGameStatus(status){}

    updateBoard(){}
}

// Exercise 5: Game (1.5 points)
export class Game {
    constructor() {}

    start() {}
}