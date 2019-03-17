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
  }

  validateProportion(trials, successes, compare) {
    if (isNaN(trials) || isNaN(successes) || isNaN(compare)) {
      return false
    }
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
                title={'STANDARD DEV:'}
              />
              <Output
                value={ this.state.sampleProportion.Variance.toFixed(3) }
                title={'VARIANCE:'}
              />
            </div>
            <div className="zscore-container">
              {this.state.sampleProportion.BaseZScores.map(score => {
                return(
                  <div className="standard-zscore-item" key={ "Z" + score.Z } >
                    <h3>{ score.Z }</h3>
                    <ZScore
                      outputLabelClass="standard-zscore-label"
                      outputValueClass="standard-zscore-value"
                      probability={ score.Probability.toFixed(3) }
                      value={ score.Value.toFixed(3) }
                    />
                  </div>
                )
              })}
            </div>
            <div className="form-group">
              <h2>COMPARE TO:</h2>
              <ZScore
                probability={ this.state.sampleProportion.CompareZScore.Probability.toFixed(3) }
                value={ this.state.sampleProportion.CompareZScore.Value.toFixed(3) }
                zscore={ this.state.sampleProportion.CompareZScore.Z.toFixed(3) }
              />
            </div>
          </div>:
          null
        }
      </div>
    )
  }
}
