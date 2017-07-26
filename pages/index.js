import React from 'react'
import { connect } from 'react-redux'

import HeaderBar from '../../components/header-bar'

import { List, ListItem } from 't63'

const Page = props => {
  return (
    <section>
      <HeaderBar

        title={props.title}
        navRight="/search" iconRight="search"
      />
      {/* list movies here */}
    </section>
  )
}

const connector = connect(mapStateToProps)

export default connector(Page)

function mapStateToProps (state) {
  return {
    title: state.app.title,
    movies: state.movies
  }
}
