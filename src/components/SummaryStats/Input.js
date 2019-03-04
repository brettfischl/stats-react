import React, { Component } from 'react'
import './SummaryStats.css'

const Input = (props) => {
    return (
      <div>
        <label htmlFor={props.name} className="form-label">{props.title}</label>
        <input
          className="form-input"
          id={props.name}
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
        />
      </div>
  )
}

export default Input;
