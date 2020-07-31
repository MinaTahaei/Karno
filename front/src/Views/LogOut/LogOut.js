import React, { Component } from 'react'
import Logout from './../../images/LogOut.jpg'
import { Container, Row, Col } from 'reactstrap'
import './LogOut.css'
class LogOut extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col lg='6'>
            <div className='LogOutDiv'>
              <img className='LogOut' src={Logout} alt='LogOut' />
            </div>
          </Col>
          <Col lg='6'>
            <div className='LogOutText'>
             Thanks For Using Our Website
            </div>
          </Col>
        </Row>
      </Container>

    )
  }
}
export default LogOut
