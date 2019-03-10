import React, { Component } from 'react'
import Input from './Input'
import Output from './Output'
import ZScore from './ZScore'

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

  validateProportion(trials, successes, compare) {
    if (trials === 0 || (trials < successes) || (trials < compare)) {
      return false
    }
    return true
  }

  findSampleProportion() {
    const trials = this.state.trials;
    const successes = this.state.successes;
    const compare = this.state.compare;

    if (this.validateProportion(parseInt(trials), parseInt(successes), parseInt(compare))) {
      const sampleProportion = computeSampleProportion(trials, successes, compare)
      console.log(sampleProportion)
      this.setState({
        computed: true,
        sampleProportion,
      })
    } else {
      alert("submit a valid proportion")
    }
  }

  render() {
    return (
      this.state.isLoading ?
      <div>Reticulating splines...</div> :
      <div>
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
          <div className='button-wrapper'>
            <button onClick={ this.findSampleProportion }>Click to compute stats</button>
          </div>
        </div>
        {
          this.state.computed ?
          <div>
            <div className="form-group">
              <Output
                value={ this.state.sampleProportion.Mean.toFixed(3) }
                title={'MEAN:'}
              />
              <Output
                value={ this.state.sampleProportion.StandardDeviation.toFixed(3) }
                title={'SANDARD DEV:'}
              />
              <Output
                value={ this.state.sampleProportion.Variance.toFixed(3) }
                title={'VARIANCE:'}
              />
            </div>
            <div>
              {this.state.sampleProportion.BaseZScores.map(score => {
                return(
                  <div key={ "Z" + score.Z } >
                    <h3>{ score.Z }</h3>
                    <ZScore
                      probability={ score.Probability.toFixed(3) }
                      value={ score.Value.toFixed(3) }
                    />
                  </div>
                )
              })}
              <div className="form-group">
                <h2>COMPARE TO:</h2>
                <ZScore
                  probability={ this.state.sampleProportion.CompareZScore.Probability.toFixed(3) }
                  value={ this.state.sampleProportion.CompareZScore.Value.toFixed(3) }
                  zscore={ this.state.sampleProportion.CompareZScore.Z.toFixed(3) }
                />
              </div>
            </div>
          </div>:
          null
        }
      </div>
    )
  }
}
