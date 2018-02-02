import React from 'react'

class Anecdote extends React.Component {
    render() {
        const anecdote = this.props.anecdote
        return (
            <div>
                <h2>{anecdote.content} by {anecdote.author}</h2>
                <p>has {anecdote.votes} votes</p>
                <p>for more info see <a href={anecdote.url}>{anecdote.url}</a> </p>
            </div>
        )
    }
}

export default Anecdote