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

  handleSpaceInput = (event) => {
    console.log(event.nativeEvent.srcElement.id)
  }

  render() {
    const blocks = []
    const rows = []
    let spaces = []
    if (this.state.isPlaying) {
      // Create block divs that represent the blocks
      for (let block = 0; block < 9; block++) {
        blocks.push(<div key={1000 + block} className="board-block" />)
      }

      // Traverse the board array and create the spaces
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          spaces.push(<div key={2000 + col + row} id={`${row}-${col}`} className="board-space" contentEditable={Number(this.state.board[row][col]) === 0 ? 'true' : 'false'} onInput={this.handleSpaceInput} >{this.state.board[row][col]}</div>)
        }
        rows.push(<div key={3000 + row} id={`row-${row}`} className="board-row" >{spaces}</div>)
        spaces = []
      }
    }
    return (
      <div className="sudoku-board" >
        { !this.state.isPlaying &&
          <DifficultyModal handleClick={this.handleDifficultySelection} /> }
        <div className="board-blocks">
          <div className="board-blocks-row">
            {blocks.slice(0, 3)}
          </div>
          <div className="board-blocks-row">
            {blocks.slice(3, 6)}
          </div>
          <div className="board-blocks-row">
            {blocks.slice(6, 9)}
          </div>
        </div>
        <div className="board-spaces" >
          {rows}
        </div>
      </div>
    )
  }
}

export default Board
