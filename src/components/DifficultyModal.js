import React from 'react'
import PropTypes from 'prop-types'
import '../css/difficultyModal.css'

const DifficultyModal = (props) => {
  return (
    <div className="difficulty-modal">
      <h3 className="difficulty-label">Select Difficulty:</h3>
      <div
        className="difficulty-button easy-selection"
        onClick={() => { props.handleClick('EASY') }}
        onKeyPress={() => { props.handleClick('EASY') }}
        role="button"
        tabIndex={0}
      >
        <span>Easy</span>
      </div>
      <div
        className="difficulty-button medium-selection"
        onClick={() => { props.handleClick('MEDIUM') }}
        onKeyPress={() => { props.handleClick('MEDIUM') }}
        role="button"
        tabIndex={0}
      >
        <span>Medium</span>
      </div>
      <div
        className="difficulty-button hard-selection"
        onClick={() => { props.handleClick('HARD') }}
        onKeyPress={() => { props.handleClick('HARD') }}
        role="button"
        tabIndex={0}
      >
        <span>Hard</span>
      </div>
    </div>
  )
}

DifficultyModal.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default DifficultyModal
