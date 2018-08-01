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
    const spaceValue = event.nativeEvent.data ? event.nativeEvent.data : ''
    // Extract the column and row of the space being changed, and update board state
    const row = Number(event.nativeEvent.srcElement.id.split('-')[0])
    const col = Number(event.nativeEvent.srcElement.id.split('-')[1])
    // eslint-disable-next-line
    if (spaceValue.length > 1 || isNaN(spaceValue)) {
      document.getElementById(event.nativeEvent.srcElement.id).innerHTML = ''
    } else if (!Sudoku.validateInsertion(this.state.board, row, col, Number(spaceValue))) {
      document.getElementById(event.nativeEvent.srcElement.id).innerHTML = ''
    } else {
      this.setState((prevState) => {
        const modifiedState = Object.assign({}, prevState)
        modifiedState.board[row][col] = spaceValue
        return modifiedState
      })
    }
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
          spaces.push(<div key={2000 + col + row} id={`${row}-${col}`} className="board-space" contentEditable={Number(this.state.board[row][col]) !== 0 && typeof this.state.board[row][col] === 'number' ? 'false' : 'true'} suppressContentEditableWarning ref={`${row}-${col}`} onInput={this.handleSpaceInput} >{this.state.board[row][col]}</div>)
        }
        rows.push(<div key={3000 + row} id={`row-${row}`} className="board-row" >{spaces}</div>)
        spaces = []
      }
    }

    if (this.state.isFirstRender) {
      this.setState((prevState) => {
        const modifiedState = Object.assign({}, prevState)
        modifiedState.isFirstRender = false
        return modifiedState
      })
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
