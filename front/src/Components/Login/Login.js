import React, {Component} from 'react'
import LoginLogo from './../../images/Login.png'
import LoginPic from './../../images/LoginPic.png'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import {Container, Row, Col } from 'reactstrap'
import HRPanel from './../HR Panel/HRPanel'



axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Login extends Component {
    state = {
      redirect: false,
      redirectHR:false,
      email: "",
      password: "",
      isLogin: false,
      loggedIn: false,
      returnedEmail: "",
      returnedFirstName:"",
      returnedLastName:"",
      returnedCompanyName:"",
      returnedCompanyCode:" ",
      LoginToken:" ",
    }
    
      componentWillMount = ()=>{
        this.setState({isLogin: false});
      }
  
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/src/Components/HR Panel' />
        }
      }
  
      setRedirectHR = () => {
        this.setState({
          redirectHR: true
        })
      }
  
      doLogin = event => {
        event.preventDefault();
        var email1 = document.getElementById("email").value;
        var password1 = document.getElementById("password").value;
        const headers = {
          'Content-Type': 'application/json',
        }
        const data = {
          'email': email1,
          'password': password1
        }
        
        axios.post('/api/auth/login/', data, {headers:headers, withCredentials:true}).then(
          res => {
            if(res.data != null){
              console.log(res.data);
              this.setState({
                loggedIn: true,
                returnedEmail: res.data.email,
                returnedFirstName: res.data.first_name,
                returnedLastName: res.data.last_name,
                returnedCompanyName: res.data.company_name,
                returnedCompanyCode: res.data.company_code,
                LoginToken: res.data.token,  
              })
              console.log(this.state.LoginToken);
              localStorage.setItem('LoginToken', res.data.token);
              console.log(localStorage)
            }else{
              console.log("failed to log in");
            }
          }
        ).catch(error => {
          console.error(error.response);
          
        })
      }
  
      renderRedirectHR = () => {
        if (this.state.redirectHR) {
          return <Redirect to='./../HR Panel/HRPanel.js' />
        }
      }
  
  
    render() {
      return (
          <div>
          {
            this.state.loggedIn?
                  <HRPanel email={this.state.returnedEmail} first_name={this.state.returnedFirstName}
                  last_name={this.state.returnedLastName} company_code={this.state.company_code} 
                  company_name={this.state.company_name}
                  />                

  
                :
            <Container fluid>
             <Row>
                <Col className='Col1'>
                <div className='LoginPic'>
                 <img className='LoginPicc' src = {LoginPic} alt='loginPic'></img>
                </div>    
                </Col>

                <Col className='Col2'> 
                <div className='LoginBox'>
                    <div className = 'LoginLogo'>
                        <img className='LoginLogoo' src ={LoginLogo} alt='LoginLogo'></img>
                    </div>

                    <div className = 'LoginForm'>
                     <form onSubmit={this.doLogin}>

                        <div className='FormItems'>
                         <label > نام کاربری یا ایمیل </label>
                         <input type="email" name="" id="email"  required></input>
                        </div>
                        <p> </p>
                        <p></p>
                        <div className='FormItems'>
                         <label >رمز عبور</label>
                         <input type="password" id="password" name=""  required></input>
                        </div>
                        <p> </p>
                        <div className='FormItems'>{this.renderRedirectHR()}<input type="submit" name="" value="ورود" onClick={this.doLogin}></input></div>
                     </form>
                    </div>
                </div>
                </Col>
             </Row>
            </Container>
  
          }
          </div>
      )
    }
  }
 


