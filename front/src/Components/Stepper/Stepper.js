import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Stepper.scss'
class Stepper extends Component {
  constructor () {
    super()
    this.state = {
      steps: []
    }
  }

  componentDidMount () {
    const { steps, currentStepNumber } = this.props
    const stepsState = steps.map((step, index) => {
      const stepObj = {}
      stepObj.description = step
      stepObj.completed = false
      stepObj.highlighted = index === 0
      stepObj.selected = index === 0
      return stepObj
    })
    const currentSteps = this.updateStep(currentStepNumber, stepsState)
    this.setState({
      steps: currentSteps
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.currentStepNumber !== this.props.currentStepNumber) {
      const { steps } = this.state
      const currentSteps = this.updateStep(this.props.currentStepNumber, steps)

      this.setState({
        steps: currentSteps
      })
    }
  }

  updateStep (stepNumber, steps) {
    const newSteps = [...steps]
    let stepCounter = 0

    while (stepCounter < newSteps.length) {
      // current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false
        }
        stepCounter += 1
      }
      // past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true
        }
        stepCounter += 1
      }

      // future step
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false
        }
        stepCounter += 1
      }
    }
    return newSteps
  }

  render () {
    const { steps } = this.state
    const stepsDisplay = steps.map((step, index) => {
      return (
        <div className='step-wrapper' key={index}>
          <div className={`step-number ${step.selected ? 'step-number-active' : 'step-number-disabled'}`} style={{ fontFamily: 'IranSans' }}>{step.completed ? <span style={{ fontFamily: 'IranSans' }}> &#10003; </span> : index + 1}</div>
          <div className={`step-description ${step.highlighted && 'step-description-active'}`} style={{ fontFamily: 'IranSans', fontSize: '14px' }}>{step.description}</div>
          <div className={index !== steps.length - 1 ? 'divider-line' : ''} />
        </div>

      )
    })

    return (
      <>
        <div className='stepper-container-horizontal'>
          <div className='stepper-wrapper-horizontal'>
            {stepsDisplay}
          </div>
        </div>
      </>
    )
  }
}

Stepper.propTypes = {
  steps: PropTypes.array.isRequired
}
export default Stepper
