/* eslint-disable */
import React from 'react'
import HRPanel from '../../../Components/HR Panel/HRPanel.js'
import { Widget, WidgetContainer } from '@duik/widget'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import './Candidates.css'
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

  function useCandidates () {
    const [jobs, setJobs] = React.useState([])
    const [candidates, setCandidates] = React.useState({})

    const deleteCandidate = (id) => {
      console.log('DC fired 2')
      setJobs(prevJobs => prevJobs.filter(job => candidates[job.id].id !== id))
    }

    React.useEffect(() => {
        fetchJSON('/api/people/candidates-per-company', { headers: headers })
          .then(setJobs)
      }, [])
    
      React.useEffect(() => {
        async function fetchCandidates () {
          const cPromises = []
          for (const job of jobs) {
            for (const candidate of job.candidates) {
              cPromises.push(fetchJSON(`/api/people/get-candidate/${candidate}`, { headers: headers })
                .then((candidates) => {
                  return { 
                    [job.id]: candidates
                   } 
                }))
            }
          }
          const dData = await Promise.all(cPromises)
          setCandidates(prev => Object.assign({}, ...dData))
        }
        fetchCandidates()
      }, [jobs])
      return [jobs, candidates, deleteCandidate]
  }
  function DeleteCandidate (candidateid) {
    console.log('DC fired 1')
    console.log(candidateid)
    return axios({
      method: 'delete',
      url: '/api/people/delete-candidate/' + candidateid,
      headers: headers
    })
    .catch(error => {
      console.log(error.response)
    })
  }
  
  export default function Candidates () {
      const classes = useStyles()
      const [jobs, candidates, deleteCandidate] = useCandidates()
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
               مشاهده افراد کاندید شده برای شغل ها
              </h3>
            </Widget>
          </WidgetContainer>
          <div className='mainBox'>
          {jobs.map(job => (
                <>
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
                        onClick={async () => { await DeleteCandidate(candidates[job.id].id); deleteCandidate(candidates[job.id].id) }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    }
                  />
                    <Typography style={{ position: 'relative', top: '5px' }} className={classes.heading}>Candidate #{candidates[job.id] && candidates[job.id].id} </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Container className='CandidateContainer'>
                      <Typography className={classes.TextHeaders}>
                        <Row>
                          <Col style={{ color: 'black' }}><p style={{ color: 'gray' }}>Title:</p> {job.title} </Col>
                          <Col><p style={{ color: 'gray' }}>Company Name:</p>  {job.company_name} </Col>
                          <Col style={{ color: 'black' }}><p style={{ color: 'gray' }}>Job Id:</p> {job.id} </Col>
                        </Row>
                        <br />
                        <Row>
                          {candidates[job.id] && <Col key={candidates[job.id].id}><p style ={{color:'gray'}}>First Name:</p> {candidates[job.id].first_name}</Col>}
                          {candidates[job.id] && <Col key={candidates[job.id].id} style={{ color: 'black' }}><p style ={{color:'gray'}}>Last Name:</p> {candidates[job.id].last_name}</Col>}
                          {candidates[job.id] && <Col key={candidates[job.id].id}><p style ={{color:'gray'}}>Email:</p> {candidates[job.id].email}</Col>}
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