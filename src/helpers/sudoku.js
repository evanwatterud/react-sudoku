module.exports = {
  validate(board) {
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
  }
}
