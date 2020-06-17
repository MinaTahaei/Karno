/* eslint-disable default-case */
import React, { Component } from 'react'
import HRPanel from './../../Components/HR Panel/HRPanel.js'
import { Widget, WidgetContainer } from '@duik/widget'
// import Stepper from './../../Components/Stepper/Stepper.js'
// import './../../Components/Stepper/StepperButton.scss'
import { MainInfo } from './JobForms/MainInfo/MainInfo.js'
import { Accepted } from './JobForms/Accepted/Accepted.js'
import { Details } from './JobForms/Details/Details.js'
import { AdditionalInfo } from './JobForms/AdditionalInfo/AdditionalInfo.js'
import { Confirmation } from './JobForms/Confirmation/Confirmation.js'
class CreateJob extends Component {
  state = {
    step:1,
    Title:'',
    requirements:'',
    Location:'',
    Benefits:'',
    Company:'',
    InternalCode:'',
    Details:'',
    Tags:[],
    Address:'',
    Department:'',
    Salary:''
  }

  nextStep =() => {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }
  prevStep =() => {
   const {step} = this.state
   this.setState({
     step: step - 1
   })
 }

 handleChange = input => e => {
  this.setState({ [input]: e.target.value }); 
}
handleDropDown = input => value => {
  this.setState({ [input]: value }); 
}
  render () {
    const { step } = this.state
    const {Title,Benefits,Company,InternalCode,Detailss,Tags,Address,Department,Salary,requirements,Location } = this.state;
    const values ={Title,Benefits,Company,InternalCode,Detailss,Tags,Address,Department,Salary,requirements,Location}


    return (
      <div>
        <HRPanel />
        <div>
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
               اضافه کردن فرصت شغلی جدید
              </h3>
            </Widget>
          </WidgetContainer>
        </div>
        <WidgetContainer>
          {/* <Stepper steps={stepsArray} currentStepNumber={currentStep - 1} /> */}
        </WidgetContainer>
        <div>
        {(()=>{
          switch (step) {
            case 1:
              return(
                <MainInfo
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  handleDropDown={this.handleDropDown}
                  values={values}
                />
              )
            case 2:
              return(
                <Details
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                handleDropDown={this.handleDropDown}
                values={values}
                />
              )
            case 3:
              return(
                <AdditionalInfo
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                handleDropDown={this.handleDropDown}
                values={values}
                />
              )
            case 4:
              return(
                <Confirmation
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                values={values}
                />
              )
            case 5:
              return(
                <Accepted/>
              )
          }
        })()}
    
        </div>
      </div>
    )
  }
}

export default CreateJob
