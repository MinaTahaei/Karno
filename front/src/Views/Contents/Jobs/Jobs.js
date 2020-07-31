/* eslint-disable */
import React from 'react'
import HRPanel from '../../../Components/HR Panel/HRPanel.js'
import axios from 'axios'
import { Widget, WidgetContainer } from '@duik/widget'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Container, Row, Col } from 'reactstrap'
import { Modal, Button, Form } from 'react-bootstrap'
import GetAppIcon from '@material-ui/icons/GetApp';
import './Jobs.css'
const fetch = require('node-fetch')

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'black',
    fontFamily: 'IranSans'
  },
  Texts: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'black',
    fontFamily: 'IranSans'
  },
  TextHeaders: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'green',
    fontFamily: 'IranSans'
  }

}))

let LoginToken = localStorage.getItem('LoginToken')
const headers = {
  Authorization: 'Token' + ' ' +localStorage.getItem('LoginToken')
}
console.log(LoginToken)

function fetchJSON (url, options) {
  return fetch(url, options)
    .then(r => {
      if (!r.ok) {
        throw new Error('HTTP error ' + r.status)
      }
      return r.json()
    })
}

function useJobs () {
  const [jobs, setJobs] = React.useState([])
  const [locations, setLocations] = React.useState({})
  const [departments, setDepartments] = React.useState({})
  const [tags, setTags] = React.useState({})

  const deleteJob = (id) => {
    console.log('deletejob fired 2')
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id))
  }
  const editJob = () => {
    console.log('editjob fired 2')
    fetchJSON('/api/jobs/list-jobs/Karno', { headers: headers })
      .then(setJobs)
  }

  React.useEffect(() => {
    fetchJSON('/api/jobs/list-jobs/Karno', { headers: headers })
      .then(setJobs)
  }, [])
  React.useEffect(() => {
    async function fetchLocations () {
      const promises = []
      for (const job of jobs) {
        promises.push(fetchJSON(`/api/jobs/view-location/${job.location}/`, { headers: headers })
          .then((locations) => {
            return { [job.id]: locations }
          }))
      }
      const data = await Promise.all(promises)
      setLocations(prev => Object.assign({}, ...data))
    }
    fetchLocations()
  }, [jobs])

  React.useEffect(() => {
    async function fetchDepartments () {
      const dPromises = []
      for (const job of jobs) {
        dPromises.push(fetchJSON(`/api/jobs/view-department/${job.department}`, { headers: headers })
          .then((departments) => {
            return { [job.id]: departments }
          }))
      }
      const dData = await Promise.all(dPromises)
      setDepartments(prev => Object.assign({}, ...dData))
    }
    fetchDepartments()
  }, [jobs])

  React.useEffect(() => {
    async function fetchTags () {
      const tPromises = []
      for (const job of jobs) {
        for (const tag of job.tags) {
          tPromises.push(fetchJSON(`/api/jobs/view-tag/${tag}`, { headers: headers })
            .then((tags) => {
              return { [job.id]: tags }
            }))
        }
      }
      const dData = await Promise.all(tPromises)
      const tags = dData.reduce((acc, item) => {
        const [key, value] = Object.entries(item)[0]
        if (acc[key]) {
          acc[key].push(value)
        } else {
          acc[key] = [value]
        }
        return acc
      }, {})
      setTags(prev => ({ ...prev, ...tags }))
    }
    fetchTags()
  }, [jobs])

  return [jobs, locations, departments, tags, deleteJob, editJob]
}

function DeleteJob (jobid) {
  console.log('deletejob fired 1')
  console.log(jobid)
  return axios({
    method: 'delete',
    url: '/api/jobs/delete-job/' + jobid,
    headers: headers
  })
  .catch(error => {
    console.log(error.response)
  })
}

function EditJob (jobid) {
  
  console.log('editjob fired 1')
  console.log(jobid)
 
  const updateJob = {
    title: event.target.jobtitle.value,
    company_name: event.target.companyname.value,
    internal_code: event.target.internalcode.value,
    benefits: event.target.benefits.value,
    description: event.target.description.value,
    requirements: event.target.requirements.value
  }
 console.log(event.target.tags)
  return axios({
    method: 'put',
    url: '/api/jobs/update-job/' + jobid+'/',
    headers: headers,
    data: updateJob
  })
  .then(response => {
    console.log(response)
    alert('Job Updated Successfully!')
  })
  .catch(error => {
    console.log(error.response)
  })
}

function getJobExcel() {
  console.log('test')
  return axios({
    method: 'get',
    url: '/api/jobs/job-excel/',
    headers: headers,
    responseType: 'blob'
  })
  .then((response) =>
  {
   const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', 'file.xls');
   document.body.appendChild(link);
   link.click();
  })
  .catch(error => {
    console.log(error.response)
  })
}
export default function Jobs () {
  const classes = useStyles()
  const [jobs, locations, departments, tags, deleteJob, editJob] = useJobs()
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <HRPanel />
      <WidgetContainer>
        <Widget
          padding style={{
            fontFamily: 'IranSans',
            textAlign: 'right',
            fontSize: '14px',
            height: '20px',
            boxShadow: '1px 1px 1px 0px #888888',
            backgroundColor: '#f3eaf7'
          }}
        >
          <h3 style={{
            position: 'relative',
            bottom: '12px'
          }}
          >
           مشاهده فرصت های شغلی
          </h3>
        </Widget>
      </WidgetContainer>
      <div className='mainBox'>
        {jobs.map(job => (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Job Position</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='container'>
                <Form onSubmit = {async (event) => {
                  event.preventDefault(); 
                  await EditJob(job.id); 
                  editJob() 
               }}>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId='jobtitle'>
                      <Form.Label style={{ color: 'green' }}>Job Title :</Form.Label>
                      <Form.Control type='textbox' defaultValue={job.title} name='jobtitle' required placeholder='Enter Job Title' />
                    </Form.Group>
                    <Form.Group controlId='internalCode'>
                      <Form.Label style={{ color: 'green' }}>Internal Code :</Form.Label>
                      <Form.Control type='textbox' defaultValue={job.internal_code} name='internalcode' required placeholder='Enter Internal Code' />
                    </Form.Group>
                    <Form.Group controlId='department'>
                    <Form.Label style={{ color: 'green' }}>Department :</Form.Label>
                    <Form.Control type='textbox' defaultValue={departments[job.id] && departments[job.id].name } name='department' disabled required placeholder='Enter Department' />
                  </Form.Group>
                  </Col>
                <Col lg={6}>
                  <Form.Group controlId='jlocation'>
                    <Form.Label style={{ color: 'green' }}>Location :</Form.Label>
                    <Form.Control type='textbox' defaultValue={locations[job.id] && locations[job.id].country} name='jlocation' disabled required placeholder='Enter Location' />
                  </Form.Group>
                  <Form.Group controlId='tags'>
                    <Form.Label style={{ color: 'green' }}>Tags:</Form.Label>
                    <Form.Control type='textbox' defaultValue={tags[job.id] &&  tags[job.id].map(tag => tag.name).join(',')} name='tags' disabled required placeholder='Enter tags' />
                  </Form.Group>
                  <Form.Group controlId='benefits' >
                   <Form.Label style={{ color: 'green' }}>Benefits :</Form.Label>
                   <Form.Control type='textbox' defaultValue={job.benefits} name='benefits' required placeholder='Enter Benefits' />
                </Form.Group>
                </Col>
              <Col lg={12}>
                <Form.Group controlId='description'>
                  <Form.Label style={{ color: 'green' }}>Description :</Form.Label>
                  <Form.Control type='textbox' defaultValue={job.description} name='description' required placeholder='Enter Description' />
                </Form.Group>
                <Form.Group controlId='requirements'>
                  <Form.Label style={{ color: 'green' }}>Requirements :</Form.Label>
                  <Form.Control type='textbox' defaultValue={job.requirements} name='requirements' required placeholder='Enter Requirements' />
                </Form.Group>
              <Form.Group controlId='companyname'>
                <Form.Label style={{ color: 'green' }}>Company Name :</Form.Label>
                <Form.Control type='textbox' defaultValue={job.company_name} name='companyname' required disabled />
              </Form.Group>
              <Form.Group>
                <Button style={{ position: 'relative', left: '295px' }} variant='success' type='submit'>Edit Job Position</Button>
              </Form.Group>
              </Col>
            </Row>
              </Form>
                </div>
              </Modal.Body>
            </Modal>

            <div className={classes.root} key={job.id}>
              <ExpansionPanel style={{ backgroundColor: 'white' }}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  style={{ backgroundColor: '#11ed7f' }}
                >
                
                  <FormControlLabel
                    aria-label='Acknowledge'
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                      <IconButton
                        aria-label='delete' style={{ color: 'red' }} variant='outlined'
                        onClick={async () => { await DeleteJob(job.id); deleteJob(job.id) }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    }
                  />

                  <Typography style={{ position: 'relative', top: '12px' }} className={classes.heading}>Job Opportunity #{job.id}</Typography>
                  <FormControlLabel
                    aria-label='Acknowledge'
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                      <IconButton
                        aria-label='edit' style={{ color: '#b5002a', position: 'relative', left: '730px' }} variant='outlined' 
                        onClick={handleShow}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    }
                  />
                    <FormControlLabel
                    aria-label='Acknowledge'
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                      <IconButton
                        aria-label='excel' style={{ color: '#b5002a', position: 'relative', left: '630px',bottom:'3px' }} variant='outlined' 
                        onClick={async () => { await getJobExcel();}}
                      >
                        <GetAppIcon />
                      </IconButton>
                    }
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Container className='jobContainer'>
                    <Typography className={classes.TextHeaders}>
                      <Row>
                        <Col style={{ color: 'black' }}><p style={{ color: 'gray' }}>Title:</p> {job.title} </Col>
                        <Col><p style={{ color: 'gray' }}>Company Name:</p>  {job.company_name} </Col>
                        <Col style={{ color: 'black' }}><p style={{ color: 'gray' }}>Internal Code:</p> {job.internal_code} </Col>
                      </Row>
                      <br />
                      <Row>
                        {departments[job.id] && <Col key={departments[job.id].id}><p style={{ color: 'gray' }}>Department:</p> {departments[job.id].name}</Col>}
                        {locations[job.id] && <Col key={locations[job.id].id} style={{ color: 'black' }}><p style={{ color: 'gray' }}>Location:</p> {locations[job.id].country}, {locations[job.id].region} </Col>}
                        {tags[job.id] && <Col><p style={{ color: 'gray' }}>Tags:</p> {tags[job.id].map(tag => tag.name).join(',')} </Col>}
                      </Row>
                      <br />
                      <Row>
                        <Col style={{ color: 'black' }}><p style={{ color: 'gray' }}>Benefits:</p>   {job.benefits} </Col>
                        <Col><p style={{ color: 'gray' }}>Description:</p> {job.description} </Col>
                        <Col style={{ color: 'black' }}><p style={{ color: 'gray' }}>Requirements:</p> {job.requirements} </Col>
                      </Row>
                    </Typography>
                  </Container>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <br />
          </>
        ))}
      </div>
    </>
  )
}
