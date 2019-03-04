import React, { Component } from 'react'
import Input from './Input'

export default class SummaryStats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trials: 0,
      successes: 0,
      compare: 0,
      isLoading: true,
      computed: false
    }

    this.handleInput = this.handleInput.bind(this)
    this.findSampleProportion = this.findSampleProportion.bind(this)
  }
  componentDidMount() {
    WebAssembly.instantiateStreaming(fetch("src/main.wasm"), go.importObject).then(async (result) => {
  		go.run(result.instance)
  		this.setState({ isLoading: false })
  	});
  }

  handleInput(e) {
    let value = e.target.value;
    let key = e.target.name
    this.setState({[key]: value})
    console.log(this.state)
  }

  findSampleProportion() {
    const trials = this.state.trials;
    const successes = this.state.successes;
    const compare = this.state.compare;

    const sampleProportion = computeSampleProportion(trials, successes, compare)
    console.log(sampleProportion)
    this.setState({
      computed: true,
      sampleProportion,
    })
  }

  render() {
    return (
      this.state.isLoading ?
      <div>Reticulating splines...</div> :
      <div className='form-group'>
        <div>
          <Input type={'text'}
            title={'TRIALS:'}
            name={'trials'}
            handleChange={this.handleInput}
          />
          <Input type={'text'}
            title={'SUCCESSES:'}
            name={'successes'}
            handleChange={this.handleInput}
          />
          <Input type={'text'}
            title={'COMPARE TO:'}
            name={'compare'}
            handleChange={this.handleInput}
          />
        </div>
        <div className='form-group'>
          <button onClick={ this.findSampleProportion }>Click to compute stats</button>
        </div>
      {
        this.state.computed ?
        <div>
          <p className='output'>
            MEAN:
          </p>
          <p className='value'>
            { this.state.sampleProportion.Mean.toFixed(3) }
          </p>
          <p className='output'>
            STANDARD DEV:
          </p>
          <p className='value'>
             { this.state.sampleProportion.StandardDeviation.toFixed(3) }
          </p>
          <p className='output'>
            VARIANCE:
          </p>
          <p className='value'>
            { this.state.sampleProportion.Variance.toFixed(3) }
          </p>
        </div>:
        null
      }
      </div>
    )
  }
}
