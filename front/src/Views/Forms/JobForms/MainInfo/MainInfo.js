
import React, {Component} from 'react'
import { TextField } from '@material-ui/core'
import './MainInfo.css'
import {Container, Row, Col} from 'reactstrap'
import './../../../../Components/Stepper/StepperButton.scss'


export class MainInfo extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
 
  render () {
    const {values, handleChange } = this.props
    return (
      
      <Container className='containerM'>
      <Row>
      <Col>
      <div className='HeaderM'>
        اطلاعات اولیه
       </div>
      <TextField
      placeholder="Enter Job Title"
      label="Job Title"
      onChange={handleChange('Title')}
      defaultValue={values.Title}
      margin="normal"
      fullWidth="true"
      type='input'
      id="outlined-basic" 
      variant="outlined"
      required

    />
    <br />
   <TextField
   placeholder="Enter Company's name"
   label="Company"
   onChange={handleChange('Company')}
   defaultValue={values.Company}
   margin="normal"
   fullWidth="true"
   type='input'
   id="outlined-basic" 
   variant="outlined"
   required

/>
 <br />
<TextField
 placeholder="Enter Internal Code"
 label="Internal Code"
 onChange={handleChange('InternalCode')}
 defaultValue={values.InternalCode}
 margin="normal"
 fullWidth="true"
 type='input'
 id="outlined-basic" 
 variant="outlined"
 required

  />
  <br />
 <TextField
  placeholder="Enter Benefits"
  label="Benefits"
  onChange={handleChange('Benefits')}
  defaultValue={values.Benefits}
   margin="normal"
   fullWidth="true"
   type='input'
   id="outlined-basic" 
   variant="outlined"
   multiline
  rows={8}
  required
 />
  </Col>
    </Row>         
        <div className='buttons-container'>           
          <button style={{position :'relative', top: '70px'}} onClick={this.continue} className='next'>ادامه</button>   
        </div>
        </Container>
    )
  }
}
