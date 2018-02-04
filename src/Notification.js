import React from 'react'

class Notification extends React.Component {


    constructor(props) {
      super(props)
      this.state = {
          message: props.message
      }
    }

  render() {
    const message = this.state.message
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      color: 'green'
    }
    if (message === undefined) {
      return (
        <div></div>
      )
    }
    else {
      setTimeout(() => {
        this.setState({
            message: undefined
        })
      },10000)
      return (
        <div style={style}>
          {message}
        </div>
      )

    }

  }
}

export default Notification