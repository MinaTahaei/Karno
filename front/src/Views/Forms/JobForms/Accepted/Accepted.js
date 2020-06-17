import React, { Component } from 'react'
import SaveJob from './../../../../images/savejob.jpg'
import './Accepted.css'
export class Accepted extends Component {
  render () {
    return (
      <div>
        <img className='SaveJob' src={SaveJob} alt='picSave' />
      </div>
    )
  }
}
