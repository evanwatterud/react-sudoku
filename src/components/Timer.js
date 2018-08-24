import React from 'react'
import PropTypes from 'prop-types'
import '../css/timer.css'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: 0,
      seconds: 0
    }
    this.timer = 0
  }

  componentDidMount() {
    this.startTimer()
  }

  componentDidUpdate() {
    if (this.props.stop) {
      this.props.sendTime(this.timeToString())
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = 0
  }

  startTimer = () => {
    this.timer = setInterval(this.incrementTime, 1000)
  }

  incrementTime = () => {
    let seconds = this.state.seconds + 1
    let { minutes } = this.state

    if (seconds === 60) {
      seconds = 0
      minutes += 1
    }

    this.setState({
      minutes,
      seconds
    })
  }

  timeToString = () => {
    const secondsString = this.state.seconds.toString()
    const seconds = (secondsString.length === 1 ? `0${secondsString}` : secondsString)

    return `${this.state.minutes}:${seconds}`
  }

  render() {
    const seconds = this.state.seconds.toString()

    return (
      <span className="time-span" >{this.state.minutes} : {seconds.length === 1 ? `0${seconds}` : seconds }</span>
    )
  }
}

Timer.propTypes = {
  sendTime: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired
}

export default Timer
