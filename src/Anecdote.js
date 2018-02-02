import React from 'react'
import Notification from './Notification'

class Anecdote extends React.Component {
    render() {
        const anecdote = this.props.anecdote
        console.log("URL",anecdote.url)
        return (
            <div>
                <Notification message = {this.props.message} />
                <h2>{anecdote.content} by {anecdote.author}</h2>
                <p>has {anecdote.votes} votes</p>
                <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
            </div>
        )
    }
}

export default Anecdote