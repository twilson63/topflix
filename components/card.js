import React from 'react'

export default props => {
  return (
    <div className="flex justify-around ba br2 ma1 pa4">
      <div>
        <img className="h5" src={props.imageSrc} alt={props.title} />
      </div>
      <div className="tc">
        <h2>{props.title}</h2>
        <p>{props.year}</p>
        <button className="dim ba br2 ph2 pv2 b--black bg-white black-70">Select</button>
      </div>
    </div>
  )
}
