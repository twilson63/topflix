import React from 'react'
import R from 'ramda'
const { equals } = R
export default props => {
  return (
    <div className="flex justify-between ba br2 ma1 pa4">
      <div>
        <img className="h5" src={equals('N/A', props.Poster) ? 'https://placehold.it/200x300?text=No+Poster' : props.Poster} alt={props.Title} />
      </div>
      <div className="tc avenir">
        <h2>{props.Title}</h2>
        <p>{props.Year}</p>
        <button className="dim ba br2 ph2 pv2 b--black bg-white black-70" onClick={props.onClick}>Select</button>
      </div>
    </div>
  )
}
