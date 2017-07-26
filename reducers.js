import { combineReducers } from 'redux'
import { append, assoc } from 'ramda'
import uuid from 'uuid'

const app = (state={title: 'Favorite Movies'}, action) => state
const movies = (state=defaultMovies(), action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return append(assoc('id', uuid.v4(), action.payload), state)
    default:
      return state
  }
}
const movie = (state=defaultMovies()[0], action) => {
  switch (action.type) {
    case 'SET_MOVIE':
      return action.payload
    default:
      return state
  }
}

const search = (state='', action) => {
  switch(action.type) {
    case 'SET_SEARCH':
      return action.payload
    default:
      return state
  }
}

const searchResults = (state=[], action) => {
  switch(action.type) {
    case 'SET_RESULTS':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({app, movies, movie, search, searchResults })

function defaultMovies () {
  return [
    {
      id: 1,
      title: 'What about Bob?',
      year: '1991',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQxMjU2ODk4N15BMl5BanBnXkFtZTgwODQzNTcxMTE@._V1_SX300.jpg'
    },
    {
      id: 2,
      title: 'Groundhog Day',
      year: '1993',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
    },
    {
      id: 3,
      title: 'Ghostbusters',
      year: '1984',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_SX300.jpg'
    }
  ]
}
