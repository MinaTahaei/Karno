import React, {Component} from 'react'
import { TextField } from '@material-ui/core'
import {Container, Row, Col, Button} from 'reactstrap'
import Select from 'react-select'
import './AdditionalInfo.css'
import './../../../../Components/Stepper/StepperButton.scss'
import {AddLocModal} from './../../../../Components/PopUp/AddLocModal.js'
import {AddDepModal} from './../../../../Components/PopUp/AddDepModal.js'
import {AddTagModal} from './../../../../Components/PopUp/AddTagModal.js'
import axios from 'axios'



axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

let LoginToken = localStorage.getItem('LoginToken')
console.log(LoginToken)
const headers = {
  // eslint-disable-next-line no-useless-concat
  'Authorization': 'Token' + ' ' +localStorage.getItem('LoginToken')
}

export class AdditionalInfo extends Component {
  state = {
    locations:[],
    departments: [],
    tagsList:[],
    addModalLocShow: false,
    addModalDepShow: false,
    addModalTagShow:false,
  }
  refreshList() {
    axios.get('/api/jobs/list-locations/',{headers:headers}).then(res=>{
      this.setState({
        locations:res.data.map(Locations=>({label:[Locations.country,' ', Locations.region,' ',Locations.zipcode],value:Locations.id}))
      })
    })
    axios.get('/api/jobs/list-departments',{headers:headers}).then(resp=>{
      this.setState({
        departments:resp.data.map(departments=>({label:[departments.name,' ',departments.company_name],value:departments.id}))
      })
    })
    axios.get('/api/jobs/list-tags',{headers:headers}).then(respo =>{
      this.setState({
        tagsList:respo.data.map(Tags=>({label: Tags.name, value: Tags.id}))
      })
    })
  }
  componentDidMount() {
    this.refreshList()
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

 render() {
    const {values, handleChange, handleDropDown} = this.props  
    let addModalLocClose = () => this.setState({addModalLocShow:false})
    let addModalDepClose = () => this.setState({addModalDepShow:false})
    let addModalTagClose = () => this.setState({addModalTagShow:false})
    
    let addModalLocationAdded = () => this.refreshList()
    let addModalDepartmentAdded = () =>this.refreshList()
    let addModalTagAdded = () =>this.refreshList()
    
    return (
        <Container className='ContainerA'>

          <Row>
           <Col className='ACol'>
           <div className='HeaderM'>
             نیازمندی ها  
            </div>
         <br />
         <br/>
         <TextField
         placeholder="Enter Salary : 6 million toman "
         label="Salary"
         onChange={handleChange('Salary')}
         defaultValue={values.Salary}
         margin="normal"
         fullWidth="true"
         id="outlined-basic" 
         variant="outlined"
         required
        />
         <br />
        <br />
        <Row>
          <Col xs={10}>
            <Select placeholder='Select from pre-created Tags 'onChange={handleDropDown('Tags')} defaultValue={values.Tags} required isMulti options={this.state.tagsList}/>
          </Col>
          <Col>
         <Button style={{position:'relative',left:'150px', width:'130px'}} onClick={()=>this.setState({addModalTagShow: true})} color='success'>
              New Tags
        </Button>
        <AddTagModal show={this.state.addModalTagShow} onHide={addModalTagClose} onTagAdded={addModalTagAdded}/>
          </Col>   
        </Row> 
        <br />
        <Row>
          <Col xs={10}>
            <Select placeholder='Select from pre-created Locations'onChange={handleDropDown('Location')} defaultValue={values.Location} required options={this.state.locations}/> 
          </Col>
          <Col>
          <Button style={{position:'relative',left:'150px' }} onClick={()=>this.setState({addModalLocShow: true})} color='success'>
            New Locations
         </Button>
         <AddLocModal show={this.state.addModalLocShow} onHide={addModalLocClose} onLocationAdded={addModalLocationAdded} /> 
          </Col>
        </Row>    
        <br />
        <Row>
         <Col xs={10}>
          <Select placeholder='Select from pre-created Departments'onChange={handleDropDown('Department')} defaultValue={values.Department} required options={this.state.departments}/>
         </Col>
        <Col>
          <Button style={{position:'relative',left:'150px', width:'130px'}} onClick={()=>this.setState({addModalDepShow: true})} color='success'>
            New Department
          </Button>
          <AddDepModal show={this.state.addModalDepShow} onHide={addModalDepClose} onDepartmentAdded={addModalDepartmentAdded} />
        </Col>
        </Row> 
       <br />
      <br />
        </Col>
        </Row>
        <div className='buttons-container'>
          <button onClick={this.back} className='previous'>قبلی</button> 
          <button  type='submit' onClick={this.continue} className='next'>ادامه</button>   
       </div> 
        </Container>



    )
  } 
}
