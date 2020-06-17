import React, { Component } from 'react'
import './Confirmation.css'
import axios from 'axios'
import { ReactComponent as SideInfoIcon } from './../../../../images/Combined_Shape_6.svg'
import { Container, Row, Col } from 'reactstrap'
import { FaPencilAlt } from 'react-icons/fa'


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
let LoginToken = localStorage.getItem('LoginToken')


export class Confirmation extends Component {
  state = {
    title: '',
    company_name: '',
    internal_code:'',
    department:'',
    location:'',
    tags:[],
    benefits:'',
    description:'',
    requirements:''
  }

  handleSubmit = event => {
    const headers = {
      'content-type': 'application/json',
      // eslint-disable-next-line no-useless-concat
      'Authorization': 'Token' + ' ' +localStorage.getItem('LoginToken')
    }
    console.log(LoginToken)

    console.log('handleSubmit fired')
    event.preventDefault();
   
  const job = {
  title: this.props.values.Title,
  company_name: this.props.values.Company,
  internal_code: Number(this.props.values.InternalCode),
  department: this.props.values.Department.value,
  location: this.props.values.Location.value,
  tags: this.props.values.Tags.map(tag=>tag.value),
  benefits: this.props.values.Benefits,
  description: this.props.values.Detailss,
  requirements: this.props.values.requirements
  }
    console.log(JSON.stringify(this.props.values))
    console.log(this.props.values.requirements)
  axios({
      method: 'post',
      url: '/api/jobs/job-creation/',
      headers: headers,
      data: job
      })
      .then(() => {
      this.props.nextStep();
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render () {
    const {
      values: {
        Title, Benefits,
        Company, InternalCode, Detailss, Department,Tags, Salary,requirements,Location
      }
    } = this.props
    return (
    <form  onSubmit={this.handleSubmit}>
      <div className='container'>
        <div className='Header'>
             صحت اطلاعات زیر را تایید می کنید؟
        </div>
        <div className='BasicInfo'>
          <SideInfoIcon className='IconRight1' />
          <FaPencilAlt className='IconLeft' />
          <div className='Text1'>اطلاعات پایه</div>
        </div>
        <div className='content'>
          <Container >
            <Row>
              <Col xs='6' sm='4' className='TextContent' style={{color:'darkgreen'}}>
                <Row className='TextInside'><p style={{color:'black'}}> Salary: </p> {Salary} </Row>
                <Row><p style={{color:'black'}}>Location: </p> {Location.label}</Row>
              </Col>
              <Col xs='6' sm='4' className='TextContent' style={{color:'darkgreen'}}>
                <Row><p style={{color:'black'}}>Company:</p> {Company}</Row>
                <Row><p style={{color:'black'}}>Internal Code:</p>{InternalCode}</Row>
                <Row> <p style={{color:'black'}}>Tags: </p>{Tags.map(tag=>tag.label).join(", ")}</Row>
                <Row><p style={{color:'black'}}>Department: </p>{Department.label}</Row>  
              </Col>
              <Col xs='6' sm='4' className='TextContent' style={{color:'darkgreen'}}>
                <Row><p style={{color:'black'}}>Job Title: </p>{Title}</Row>
                <Row> <p style={{color:'black'}}>Benefits: </p>{Benefits} </Row> 
              </Col>
            </Row>
          </Container>
        </div>
        <div className='BasicInfo'>
          <SideInfoIcon className='IconRight2' />
          <FaPencilAlt className='IconLeft' />
          <div className='Text2'>توضیحات فرصت شغلی</div>
        </div>
      <Container className='content2'>
       <div className='Detailss' style={{width:'1000px'}}>
         {Detailss}
       </div>    
      </Container>  
      <div className='BasicInfo'>
          <SideInfoIcon className='IconRight2' />
          <FaPencilAlt className='IconLeft' />
          <div className='Text2'>نیازمندی های فرصت شغلی</div>
         </div>     
     <Container>
     <Container style={{position:'relative', top:'50px'}}>
      <div className='req'>
       {requirements}
      </div>
      <div className='buttons-container' style={{position:'relative',bottom:'20px'}}>
       <button type='button' onClick={this.back} className='previous'>قبلی</button> 
       <button type='submit' className='next'>ادامه</button>
     </div>
     </Container>
     </Container>
    </div>
    </form>
    )
  }
}
