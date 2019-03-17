import React, { Component } from 'react'
import './SummaryStats.css'

const Output = (props) => {
    return (
      <div>
        <label htmlFor={props.name} className={props.labelClass || "output"}>{props.title}</label>
        <p
          className={props.valueClass || 'value'}
          id={props.name}
          name={props.name}
          type={props.type}
        >
          { props.value }
        </p>
      </div>
  )
}

export default Output;
