import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export class AddLocModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('handlesubmitshot')

    const headers = {
      'content-type': 'application/json',
      Authorization: 'Token 9135a4e42531bf1d2cabbf66ff9e18a6af61e774'
    }

    const location = {
      country: event.target.LocationCountry.value,
      region: event.target.LocationRegion.value,
      zip_code: event.target.LocationZipCode.value
    }
    axios(
      {
        method: 'post',
        url: '/api/jobs/set-location/',
        headers: headers,
        data: location
      })
      .then(response => {
        console.log(response)
        alert('Location Created Successfully!')
      }
      )
      .then(
        () => this.props.onLocationAdded()
      )
      .catch(error => {
        console.log(error.response)
      })
  }

  render () {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }} id='contained-modal-title-vcenter'>
            Add New Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={4}>
                  <Form.Group controlId='LocationCountry'>
                    <Form.Label style={{ color: 'green' }}>Country :</Form.Label>
                    <Form.Control type='textbox' name='LocationCountry' required placeholder='Enter Country' />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId='LocationRegion'>
                    <Form.Label style={{ color: 'green' }}>Region :</Form.Label>
                    <Form.Control type='textbox' name='LocationRegion' required placeholder='Enter Region' />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId='LocationZipCode'>
                    <Form.Label style={{ color: 'green' }}>ZipCode :</Form.Label>
                    <Form.Control type='textbox' name='LocationZipCode' required placeholder='Enter Zip Code' />
                  </Form.Group>
                  <Form.Group>
                    <Button style={{ position: 'relative', left: '40px' }} variant='success' type='submit'>Add New Location</Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }
}
