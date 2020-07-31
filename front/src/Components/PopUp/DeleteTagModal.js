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
export class DeleteTagModal extends Component {
    state = {
        tags: [],
        idValue: ' '
    }
    getTags() {
        axios.get('/api/jobs/list-tags',{headers:headers}).then(resp=>{
            this.setState({
              tags: resp.data.map(tags=>({label: tags.name, value: tags.id}))
            })
          })
    }
    
    componentDidMount() {
        this.getTags()
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleDeletesubmitshot')
    
        const TagID = this.state.idValue.value
    
        axios(
          {
            method: 'delete',
            url: '/api/jobs/delete-tag/' + TagID,
            headers: headers,
          })
          .then(response => {
            alert('Tag Deleted Successfully!')
            this.getTags()
          })
          .catch(error => {
            console.log(error.response)
          })
      }
  render () {
    this.getTags()
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }} id='contained-modal-title-vcenter'>
            Delete Tag
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='container'>
            <Form onSubmit={this.handleSubmit}>
              {

                <Row>
                  <Col xs={6}>
                    <Select
                      onChange={(value) =>
                        this.setState({
                          idValue: value
                        })} placeholder='Select from pre-created Tags' required options={this.state.tags}
                    />
                  </Col>
                  <Col xs={6}>
                    <Button style={{ position: 'relative', left: '150px' }} variant='danger' type='submit'>Delete Tag</Button>
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
