import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Anecdote from './Anecdote'
import {ListGroup, ListGroupItem,Grid, Row, Col} from 'react-bootstrap'

const Menu = (props) => {
  const style = {
    'background-color': 'lightblue',
    padding: 10
  }
  return (
  <div>
  <Router>
    <div>    
      <div style= {style}>
        <Link to="/">home</Link> &nbsp;
        <Link to='/anecdotes'>anecdotes</Link> &nbsp;
        <Link to ='/create'>create new</Link> &nbsp;
        <Link to ='/about'>about</Link> &nbsp;
      </div>
      <Route exact path="/" render={() => <AnecdoteList anecdotes={props.anecdotes}/>} />
      <Route exact path="/anecdotes" render ={() => <AnecdoteList anecdotes={props.anecdotes}/>} />
      <Route exact path="/create" render={({history}) => <CreateNew addNew={props.addNew} history={history}/>} />
      <Route exact path="/about" render={() => <About/>} />
      <Route exact path="/anecdotes/:id" render={({match}) =>
        <Anecdote 
          anecdote={props.anecdoteById(match.params.id)}
          message={props.message} 
        />
      }
      />
    </div>
  </Router>
</div>
  )

}
  



const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
       <ListGroupItem>
      <a key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </a>
      </ListGroupItem>)
      }
    </ListGroup>  
  </div>
)

const About = () => {
  const randomNumber = Math.floor(Math.random() * 2) + 1 
  const images = ["https://pbs.twimg.com/profile_images/1152859879/kuva_400x400.jpg", "https://cdn.meme.am/images/400x/8455239.jpg"]
  return (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <Grid>
      <Row className="show-grid">
      <Col md="6">
      <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>
      </Col>

      <Col md="6">
        <img src= {images[randomNumber - 1]}/>
      </Col>
      </Row>

      </Grid>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/anecdotes/' + id)
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({notification: "A new anecdote " + anecdote.content + " created!"})
    return anecdote.id
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
          <Menu 
            anecdotes={this.state.anecdotes} 
            addNew={this.addNew}
            anecdoteById={this.anecdoteById}
            message={this.state.notification}
          />
        <Footer />
      </div>
    );
  }
}

export default App;
