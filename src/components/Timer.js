import React from 'react'
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

  render() {
    const seconds = this.state.seconds.toString()

    return (
      <span className="time-span" >{this.state.minutes} : {seconds.length === 1 ? `0${seconds}` : seconds }</span>
    )
  }
}

export default Timer
