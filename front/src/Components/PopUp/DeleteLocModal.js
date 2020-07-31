import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const headers = {
  // eslint-disable-next-line no-useless-concat
  Authorization: 'Token 6716d7ed8c3ea4166572743eb9d07b2b713605c6'
}

export class DeleteLocModal extends Component {
    state = {
        locations: [],
        idValue: ' '
    }
    getLocations() {
        axios.get('/api/jobs/list-locations',{headers:headers}).then(resp=>{
            this.setState({
              locations: resp.data.map(locations=>({label:[locations.country,' ', locations.region,' ',locations.zipcode], value:locations.id}))
            })
          })
    }
    
    componentDidMount() {
        this.getLocations()
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleDeletesubmitshot')
    
        const LocID = this.state.idValue.value
    
        axios(
          {
            method: 'delete',
            url: '/api/jobs/delete-location/' + LocID,
            headers: headers,
          })
          .then(response => {
            alert('Location Deleted Successfully!')
            this.getLocations()
          })
          .catch(error => {
            console.log(error.response)
          })
      }
  render () {
    this.getLocations()
    return (
        <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }} id='contained-modal-title-vcenter'>
            Delete Location
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
                      } placeholder='Select from pre-created Locations' required options={this.state.locations}/>
                </Col>
                <Col xs={6}>
                    <Button style={{ position: 'relative', left: '150px' }} variant='danger' type='submit'>Delete Location</Button>
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
