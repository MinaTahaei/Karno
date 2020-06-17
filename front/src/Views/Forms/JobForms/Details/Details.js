
import {Container, Row, Col } from 'reactstrap'
import React, {Component} from 'react'
import { TextField } from '@material-ui/core'
import './Details.css'
import './../../../../Components/Stepper/StepperButton.scss'

export class Details extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
 render() {
   const {handleChange,values} = this.props
      return (
            <>
              <Container className='containerD'>
                <Row> 
                  <Col className='DetCol'>
                  <div className='HeaderM'>
                     توضیحات فرصت شغلی   
                 </div>
                  <TextField
                  placeholder="Enter Job Description"
                  label="Description"
                  onChange={handleChange('Detailss')}
                  defaultValue={values.Detailss}
                  margin="normal"
                  fullWidth="true"
                  id="outlined-basic" 
                  variant="outlined"
                  multiline
                  rows={5}
                  required
                 />
                <br />
                  
                 </Col>
                </Row>
                </Container>
                <br />
                <Container className='containerD'>
                <Row> 
                  <Col className='DetCol'>
                  <div className='HeaderM'>
                     نیازمندی های فرصت شغلی   
                 </div>
                  <TextField
                  placeholder="Enter Job Requirements"
                  label="Requirements"
                  onChange={handleChange('requirements')}
                  defaultValue={values.requirements}
                  margin="normal"
                  fullWidth="true"
                  id="outlined-basic" 
                  variant="outlined"
                  multiline
                  rows={5}
                  required
                 />
                <br />
                  
                 </Col>
                </Row>
                <div className='buttons-container' style={{position:'relative', top:'70px'}}>
                <button onClick={this.back} className='previous'>قبلی</button> 
                <button onClick={this.continue} className='next'>ادامه</button>   
                </div>
              </Container>

          </>
      )
}
}
