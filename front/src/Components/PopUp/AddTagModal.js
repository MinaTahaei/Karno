import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export class AddTagModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('handlesubmitshot')
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Token 9135a4e42531bf1d2cabbf66ff9e18a6af61e774'
    }

    const tag = {
      name: event.target.TagName.value
    }
    axios(
      {
        method: 'post',
        url: '/api/jobs/set-tag/',
        headers: headers,
        data: tag
      })
      .then(response => {
        console.log(response)
        alert('Tag Created Successfully!')
      })
      .then(
        () => this.props.onTagAdded()
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
            Add New Tags
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group controlId='TagName'>
                    <Form.Label style={{ color: 'green' }}>Tag Name :</Form.Label>
                    <Form.Control type='textbox' name='TagName' required placeholder='Enter Tag Name' />
                  </Form.Group>
                  <Form.Group>
                    <Button style={{ position: 'relative', left: '10px' }} variant='success' type='submit'>Add New Tag</Button>
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
