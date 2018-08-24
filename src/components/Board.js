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
      isPlaying: false,
      difficulty: null,
      gameWon: false
    }
  }

  // Receives the time from the game timer when the game ends, decides whether it's a best time or not
  getTimerTime = (time) => {
    const { difficulty } = this.state
    const currentTime = localStorage.getItem(`${difficulty.toLowerCase()}BestTime`)

    // If there's a time saved for the current difficulty then check if the new time is better, otherwise there is no time saved so the incoming time must be the best time
    if (currentTime) {
      const currentMinutes = Number(currentTime.split(':')[0])
      const currentSeconds = Number(currentTime.split(':')[1])
      const newMinutes = Number(time.split(':')[0])
      const newSeconds = Number(time.split(':')[1])

      if (currentMinutes > newMinutes || (currentMinutes === newMinutes && currentSeconds > newSeconds)) {
        localStorage.setItem(`${difficulty.toLowerCase()}BestTime`, time)
      }
    } else {
      localStorage.setItem(`${difficulty.toLowerCase()}BestTime`, time)
    }

    // The timer only sends its time through props if the game is won, so playing is now over and the gameWon attribute can be reset
    this.setState({
      isPlaying: false,
      gameWon: false
    })
  }

  // Gets the difficulty selected from DifficultyModal and creates the sudoku board in state based on the difficulty selected
  handleDifficultySelection = (difficulty) => {
    const newBoard = Sudoku.makeBoard(difficulty)

    this.setState({
      board: newBoard,
      numericBoard: newBoard.map((val) => { return [...val] }), // Create a deep copy of the board so they can be manipulated independently
      isPlaying: true,
      difficulty
    })
  }

  // Gets the event data from users inputting values into the sudoku board spaces and checks if the input was valid or not
  handleSpaceInput = (event) => {
    const spaceValue = event.nativeEvent.data ? event.nativeEvent.data : ''
    const spaceId = event.nativeEvent.srcElement.id
    // Extract the column and row of the space being changed, and update board state
    const row = Number(spaceId.split('-')[0])
    const col = Number(spaceId.split('-')[1])
    // eslint-disable-next-line
    if (document.getElementById(spaceId).innerHTML.length > 1 || spaceValue.length > 1 || isNaN(spaceValue) || !Sudoku.validateInsertion(this.state.numericBoard, row, col, Number(spaceValue))) { // If the user input for the space isn't valid, flash the space red and reset the space input

      if (this.state.board[row][col] !== '') { // If the space was occupied, change the state to show it is no longer occupied
        this.setState((prevState) => {
          const modifiedState = Object.assign({}, prevState)
          modifiedState.board[row][col] = ''
          modifiedState.numericBoard[row][col] = ''
          return modifiedState
        })
      }

      document.getElementById(spaceId).innerHTML = ''
      this.spaceError(spaceId)
    } else { // Otherwise the space input is valid, so update the board state with the input
      this.setState((prevState) => {
        const modifiedState = Object.assign({}, prevState)
        modifiedState.board[row][col] = spaceValue
        modifiedState.numericBoard[row][col] = Number(spaceValue)

        // If the player entered the last space correctly, then indicate this in state
        if (Sudoku.validateBoard(modifiedState.numericBoard)) {
          modifiedState.gameWon = true
        }

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
          spaces.push(<div key={2000 + col + row} id={`${row}-${col}`} className="board-space" contentEditable={Number(this.state.board[row][col]) !== 0 && typeof this.state.board[row][col] === 'number' ? 'false' : 'true'} suppressContentEditableWarning ref={`${row}-${col}`} onInput={this.handleSpaceInput} style={typeof this.state.board[row][col] === 'number' ? { color: '#6b6b6b' } : null} >{this.state.board[row][col]}</div>)
        }
        rows.push(<div key={3000 + row} id={`row-${row}`} className="board-row" >{spaces}</div>)
        spaces = []
      }

      return (
        <div>
          <div className="timer-container">
            <Timer sendTime={this.getTimerTime} stop={this.state.gameWon} />
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
