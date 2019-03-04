import React, { Component } from 'react'
import SummaryStats from './SummaryStats'
import Header from './Header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="wrapper">
          <SummaryStats />
        </div>
      </div>
    )
  }
}
