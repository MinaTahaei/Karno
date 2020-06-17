import React, { Component } from 'react'
// import { Container, Row, Col } from 'reactstrap'
import SideBar from './../../Components/SideBar/SideBar'
import NavBar from './../Navigation Bar/NavBar.js'

class HRPanel extends Component {
  render () {
    return (
      <div id='App'>
        <SideBar />
        <NavBar />
      </div>
    )
  }
}

export default HRPanel
