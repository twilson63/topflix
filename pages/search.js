import React from 'react'
import { connect } from 'react-redux'

import HeaderBar from '../../components/header-bar'
import { TextField, Button, List, ListItem } from 't63'
import { search } from '../db'
import R from 'ramda'
const { map } = R

const Search = props => {
  return (
    <section>
      <HeaderBar
        navLeft="/" iconLeft="chevron-left"
        title="Search"
      />
      {/* add search form here */}
      {/* list search results here */}
    </section>
  )
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Search)

function mapStateToProps (state) {
  return {
    query: state.search,
    results: state.searchResults
  }
}

function mapActionsToProps (dispatch) {
  return {
    search: e => {
      e.preventDefault()
      dispatch(search)
    },
    add: movie => e => {
      dispatch({type: 'ADD_MOVIE', payload: movie })
    }
  }
}
