import React from 'react'
import '../css/board.css'
import DifficultyModal from './DifficultyModal'

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
      board: [],
      isPlaying: true
    })
  }

  render() {
    return (
      <div className="sudoku-board" >
        { !this.state.isPlaying &&
          <DifficultyModal handleClick={this.handleDifficultySelection} /> }
      </div>
    )
  }
}

export default Board
