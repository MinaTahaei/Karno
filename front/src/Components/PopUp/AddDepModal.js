import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export class AddDepModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('handlesubmitshot')
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Token 9135a4e42531bf1d2cabbf66ff9e18a6af61e774'
    }

    const department = {
      name: event.target.DepartmentName.value,
      company_name: event.target.DepartmentCompanyName.value
    }
    axios(
      {
        method: 'post',
        url: '/api/jobs/set-department/',
        headers: headers,
        data: department
      })
      .then(response => {
        console.log(response)
        alert('Department Created Successfully!')
      })
      .then(
        () => this.props.onDepartmentAdded()
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
            Add New Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group controlId='DepartmentName'>
                    <Form.Label style={{ color: 'green' }}>Department Name :</Form.Label>
                    <Form.Control type='textbox' name='DepartmentName' required placeholder='Enter Department Name' />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId='DepartmentCompanyName'>
                    <Form.Label style={{ color: 'green' }}>Company Name :</Form.Label>
                    <Form.Control type='textbox' name='DepartmentCompanyName' required placeholder='Enter Company Name' />
                  </Form.Group>
                  <Form.Group>
                    <Button style={{ position: 'relative', left: '150px' }} variant='success' type='submit'>Add New Department</Button>
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
