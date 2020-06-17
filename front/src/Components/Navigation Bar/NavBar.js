import React from 'react'
import TopBar from '@duik/top-bar'
import TopBarSection from '@duik/top-bar-section'
import Button from '@duik/button'
import TopBarTitle from '@duik/top-bar-title'
import Dropdown, { DropdownItem, DropdownMenu, DropdownButtonProps } from '@duik/dropdown'
import Avatar from '@duik/avatar'
import Avatarpic from './../../images/Avatar.png'
import { FiLogOut } from 'react-icons/fi'
import { DropDownButton } from './NavBarButton.tsx'
import { NotificationButton } from './NavBarButton'
import { BrowserRouter, Redirect } from 'react-router-dom'
import { ContainerVertical } from '@duik/container-vertical'
import axios from 'axios'
import Login from './../Login/Login.js'

let LoginToken = localStorage.getItem('LoginToken')
const headers = {
  Authorization: 'Token' + ' ' + localStorage.getItem('LoginToken')
}
console.log(LoginToken)
function LogOut () {
  console.log('LogOut fired')
  axios.get('/api/auth/logout/', { headers: headers }).then(
    console.log('axios fired')
  ).catch(error => {
    console.log(error.response)
  }).then(
    alert('log out successfully')
  )
}

export default function Navbar () {
  return (
    <BrowserRouter>
      <ContainerVertical>
        <TopBar style={{ backgroundColor: '#e6edec' }}>
          <TopBarSection>
            <TopBarTitle>
              <Avatar imgUrl={Avatarpic} name='حسین ساداتی پور' style={{ fontFamily: 'IranSans', fontSize: '20px' }} />
            </TopBarTitle>
            <Dropdown ButtonComponent={DropDownButton} menuPosition='bottom-center'>
              <DropdownItem>Item to click</DropdownItem>
              <DropdownItem>Item to click</DropdownItem>
              <DropdownItem>Item to click</DropdownItem>
              <DropdownItem>Item to click</DropdownItem>
            </Dropdown>
            <Dropdown ButtonComponent={NotificationButton} menuPosition='bottom-center'>
              <DropdownItem>Item to click</DropdownItem>
              <DropdownItem>Item to click</DropdownItem>
              <DropdownItem>Item to click</DropdownItem>
              <DropdownItem>Item to click</DropdownItem>
            </Dropdown>
          </TopBarSection>
          <TopBarSection>
            <Button square danger onClick={LogOut}>
              <FiLogOut />
            </Button>
          </TopBarSection>
          {// <TopBarSection>
          // burger menu Icon
          // </TopBarSection>
          }
        </TopBar>
      </ContainerVertical>
    </BrowserRouter>
  )
}
