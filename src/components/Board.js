import React from 'react'
import '../css/board.css'
import DifficultyModal from './DifficultyModal'
import Sudoku from '../helpers/sudoku'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      isPlaying: false
    }
  }

  handleDifficultySelection = (difficulty) => {
    this.setState({
      board: Sudoku.makeBoard(difficulty),
      isPlaying: true
    })
  }

  render() {
    const spaces = []
    if (this.state.isPlaying) {
      // Traverse the board array and create the spaces
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          spaces.push(<div className={`board-space row-${row}`} >{this.state.board[row][col]}</div>)
        }
      }
    }
    return (
      <div className="sudoku-board" >
        { !this.state.isPlaying &&
          <DifficultyModal handleClick={this.handleDifficultySelection} /> }
        {spaces}
      </div>
    )
  }
}

export default Board
