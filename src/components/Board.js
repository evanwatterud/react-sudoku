import React from 'react'
import '../css/board.css'
import DifficultyModal from './DifficultyModal'
import Timer from './Timer'
import Sudoku from '../helpers/sudoku'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      numericBoard: [],
      isPlaying: false
    }
  }

  handleDifficultySelection = (difficulty) => {
    this.setState({
      board: Sudoku.makeBoard(difficulty),
      numericBoard: Sudoku.makeBoard(difficulty),
      isPlaying: true
    })
  }

  handleSpaceInput = (event) => {
    const spaceValue = event.nativeEvent.data ? event.nativeEvent.data : ''
    const spaceId = event.nativeEvent.srcElement.id
    // Extract the column and row of the space being changed, and update board state
    const row = Number(spaceId.split('-')[0])
    const col = Number(spaceId.split('-')[1])
    // eslint-disable-next-line
    if (document.getElementById(spaceId).innerHTML.length > 1 || spaceValue.length > 1 || isNaN(spaceValue) || !Sudoku.validateInsertion(this.state.numericBoard, row, col, Number(spaceValue))) {
      document.getElementById(spaceId).innerHTML = ''
      this.spaceError(spaceId)
    } else {
      this.setState((prevState) => {
        const modifiedState = Object.assign({}, prevState)
        modifiedState.board[row][col] = spaceValue
        modifiedState.numericBoard[row][col] = Number(spaceValue)
        return modifiedState
      })
    }
  }

  // Provides the flashing error effect on board spaces
  spaceError = (spaceId) => {
    const space = document.getElementById(spaceId)

    space.classList.add('flash-red')
    setTimeout(() => {
      space.classList.remove('flash-red')
    }, 300)
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

    if (this.state.isPlaying) {
      return (
        <div>
          <div className="timer-container">
            <Timer />
          </div>
          <div className="sudoku-board" >
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
        </div>
      )
    }
    return (
      <div className="sudoku-board" >
        <DifficultyModal handleClick={this.handleDifficultySelection} />
      </div>
    )
  }
}

export default Board
