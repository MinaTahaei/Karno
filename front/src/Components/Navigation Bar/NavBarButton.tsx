import React from 'react'
import { DropdownButtonProps } from '@duik/dropdown'
import Button from '@duik/button'
import { IoIosArrowDown } from 'react-icons/io';
import { TiBell } from 'react-icons/ti';




export const DropDownButton = ({
  // useOpenState hook handlers
  handleToggle, handleClose, handleOpen, setOpenState, isOpen
}: DropdownButtonProps) => (
   <Button onClick={handleToggle} style={{backgroundColor: '#e6edec', border:'none', left:'20px', bottom:'5px', fontSize:'20px'}} square>
     <IoIosArrowDown />
  </Button>
)

export const NotificationButton = ({
  // useOpenState hook handlers
  handleToggle, handleClose, handleOpen, setOpenState, isOpen
}: DropdownButtonProps) => (
   <Button onClick={handleToggle} style={{backgroundColor: '#e6edec', border:'none', left:'30px', top:'2px', fontSize:'20px'}} square>
     <TiBell />
  </Button>
)
