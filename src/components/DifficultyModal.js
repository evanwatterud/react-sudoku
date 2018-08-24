import React from 'react'
import PropTypes from 'prop-types'
import '../css/difficultyModal.css'

const DifficultyModal = (props) => {
  return (
    <div className="difficulty-modal">
      <div
        className="difficulty-button easy-selection"
        onClick={() => { props.handleClick('EASY') }}
        onKeyPress={() => { props.handleClick('EASY') }}
        role="button"
        tabIndex={0}
      >
        <span><b>Easy</b></span>
        <span>Best Time: {localStorage.getItem('easyBestTime') === null ? '0:00' : localStorage.getItem('easyBestTime')}</span>
      </div>
      <div
        className="difficulty-button medium-selection"
        onClick={() => { props.handleClick('MEDIUM') }}
        onKeyPress={() => { props.handleClick('MEDIUM') }}
        role="button"
        tabIndex={0}
      >
        <span><b>Medium</b></span>
        <span>Best Time: {localStorage.getItem('mediumBestTime') === null ? '0:00' : localStorage.getItem('mediumBestTime')}</span>
      </div>
      <div
        className="difficulty-button hard-selection"
        onClick={() => { props.handleClick('HARD') }}
        onKeyPress={() => { props.handleClick('HARD') }}
        role="button"
        tabIndex={0}
      >
        <span><b>Hard</b></span>
        <span>Best Time: {localStorage.getItem('hardBestTime') === null ? '0:00' : localStorage.getItem('hardBestTime')}</span>
      </div>
    </div>
  )
}

DifficultyModal.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default DifficultyModal
