import SudokuGenerator from './SudokuGenerator'

export default {
  validateBoard(board) {
    let check = []

    // Check rows
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return false
        }
        check.push(board[row][col])
      }
      if ([...new Set(check)].length !== 9) return false
      check = []
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row < 9; row++) {
        if (board[row][col] === 0) {
          return false
        }
        check.push(board[row][col])
      }
      if ([...new Set(check)].length !== 9) return false
      check = []
    }

    // Check blocks
    for (let block = 0; block < 9; block++) {
      for (let row = (block % 3) * 3; row < ((block % 3) * 3) + 3; row++) {
        for (let col = Math.floor(block / 3) * 3; col < (Math.floor(block / 3) * 3) + 3; col++) {
          if (board[row][col] === 0) {
            return false
          }
          check.push(board[row][col])
        }
      }
      if ([...new Set(check)].length !== 9) return false
      check = []
    }

    return true
  },

  validateInsertion(board, row, col, num) {
    if (num === 0) {
      return false
    }
    // Check the row
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === num) {
        return false
      }
    }

    // Check the column
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] === num) {
        return false
      }
    }

    // Check block
    for (let i = Math.floor(row / 3) * 3; i < (Math.floor(row / 3) * 3) + 3; i++) {
      for (let j = Math.floor(col / 3) * 3; j < (Math.floor(col / 3) * 3) + 3; j++) {
        if (board[i][j] === num) {
          return false
        }
      }
    }
    return true
  },

  makeBoard(difficulty) {
    const generatedBoard = SudokuGenerator.SudokuGenerator.generate(1)[0]
    if (difficulty === 'EASY') {
      return generatedBoard.getSheet(0)
    } else if (difficulty === 'MEDIUM') {
      return generatedBoard.getSheet(1)
    }
    return generatedBoard.getSheet(2)
  }
}
