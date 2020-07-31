import React from 'react'
import TopBar from '@duik/top-bar'
import TopBarSection from '@duik/top-bar-section'
import TopBarTitle from '@duik/top-bar-title'
import Dropdown, { DropdownItem } from '@duik/dropdown'
import Avatar from '@duik/avatar'
import Avatarpic from './../../images/Avatar.png'
import { DropDownButton } from './NavBarButton.tsx'
import { NotificationButton } from './NavBarButton'
import { ContainerVertical } from '@duik/container-vertical'
import { BrowserRouter } from 'react-router-dom'

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
          {// <TopBarSection>
          // burger menu Icon
          // </TopBarSection>
          }
        </TopBar>
      </ContainerVertical>
    </BrowserRouter>
  )
}
