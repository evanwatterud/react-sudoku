import React from 'react'
import '../css/board.css'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { board: [] }
  }

  render() {
    return (
      <div className="sudoku-board" >

      </div>
    )
  }
}

export default Board
