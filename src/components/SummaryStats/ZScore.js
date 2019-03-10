import React, { Component } from 'react'
import Output from './Output'
import './SummaryStats.css'


const ZScore = (props) => {
    return (
      <div className={ props.className }>
        <Output
          title={'PROBABILITY:'}
          value={ props.probability }
        />
        <Output
          title={'VALUE:'}
          value={ props.value }
        />
        {
          props.zscore ?
          (<Output
            title={'Z SCORE:'}
            value={ props.zscore }
          />):
          null
        }
      </div>
  )
}

export default ZScore;
