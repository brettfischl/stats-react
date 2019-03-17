import React, { Component } from 'react'
import Output from './Output'
import './SummaryStats.css'


const ZScore = (props) => {
    return (
      <div className={ props.className }>
        <Output
          labelClass={props.outputLabelClass}
          valueClass={props.outputValueClass}
          title={'PROBABILITY:'}
          value={ props.probability }
        />
        <Output
          labelClass={props.outputLabelClass}
          valueClass={props.outputValueClass}
          title={'VALUE:'}
          value={ props.value }
        />
        {
          props.zscore ?
          (<Output
            className={props.outputClass}
            title={'Z SCORE:'}
            value={ props.zscore }
          />):
          null
        }
      </div>
  )
}

export default ZScore;
