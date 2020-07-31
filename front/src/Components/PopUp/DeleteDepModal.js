import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
let LoginToken = localStorage.getItem('LoginToken')

console.log(LoginToken)
const headers = {
  // eslint-disable-next-line no-useless-concat
  'Authorization': 'Token' + ' ' +localStorage.getItem('LoginToken')
}

export class DeleteDepModal extends Component {

state = {
    departments: [],
    idValue: ' '
}

getDepartments() {
    axios.get('/api/jobs/list-departments',{headers:headers}).then(resp=>{
        this.setState({
          departments: resp.data.map(departments=>({label:[departments.name,' ',departments.company_name], value:departments.id}))
        })
      })
}

componentDidMount() {
    this.getDepartments()
}
handleSubmit = (event) => {
    event.preventDefault()
    console.log('handleDeletesubmitshot')

    const DepID = this.state.idValue.value

    axios(
      {
        method: 'delete',
        url: '/api/jobs/delete-department/' + DepID,
        headers: headers,
      })
      .then(response => {
        alert('Department Deleted Successfully!')
        this.getDepartments()
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  render () {
    this.getDepartments()
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }} id='contained-modal-title-vcenter'>
            Delete Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='container'>
            <Form onSubmit={this.handleSubmit}>
            {
             
              <Row>
                <Col xs={6}>
                   <Select onChange={(value) =>
                        this.setState({
                          idValue: value,
                        })
                      } placeholder='Select from pre-created Departments' required options={this.state.departments}/>
                </Col>
                <Col xs={6}>
                    <Button style={{ position: 'relative', left: '150px' }} variant='danger' type='submit'>Delete Department</Button>
                </Col>
              </Row>
            }
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }
}
