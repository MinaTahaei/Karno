/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react'
import NavPanel from '@duik/nav-panel'
import NavTitle from '@duik/nav-title'
import NavSection from '@duik/nav-section'
import NavSectionTitle from '@duik/nav-section-title'
import NavLink from '@duik/nav-link'
import { IoIosAdd, IoIosUmbrella } from 'react-icons/io'
import { AiFillDollarCircle, AiOutlineLike } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { FiPieChart, FiBook, FiMonitor, FiLogOut } from 'react-icons/fi'
import { GiIceCube } from 'react-icons/gi'
import Radium from 'radium'
import{ BrowserRouter,Route } from 'react-router-dom'
import {routes} from './../../routes.js'
import { ContainerHorizontal } from '@duik/container-horizontal'
import {ContainerVertical} from '@duik/container-vertical'


var linkStyles = {
  base: {
    fontFamily: 'IranSans',
    textAlign: 'right',
    fontSize: '14px'
  },
  AddIcon: {
    fontSize: '35px'
  },
  Icon: {
    fontSize: '25px'
  },
  PersonIcon:{
    fontSize: '35px'
  }
}
class Sidebar extends Component {

    state = {
      navActive : '0'
    }

  render () {
    return (
      <BrowserRouter>
      <ContainerVertical style={{ backgroundColor: '#2d2e2e', height: '100vh', float:'right'}} >
      <ContainerHorizontal >
      <NavPanel dark >
        <NavTitle style={{ fontFamily: 'IranSans', textAlign: 'Center' }}>
       لوگو اینجا قرار بگیرد
        </NavTitle>
        <NavSection>
          <NavSectionTitle />
          <NavSectionTitle />  

          <NavLink  key='1' style={linkStyles.base} rightEl={<FiMonitor style={linkStyles.Icon} />} className={this.state.navActive === '1' ? 'active' :' ' }
          onClick={() => this.setState({ navActive:'1' })} style={this.state.navActive !== '1' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
          borderWidth:'0px 5px 0px 0px',
          borderColor:'#50d48b'
          }
          }
          href="/dashboard" 
          >
         داشبورد       
          </NavLink> 

          <NavLink  key='2' style={linkStyles.base} rightEl={<IoIosAdd style={linkStyles.AddIcon} />} className={this.state.navActive === '2' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'2' })} style={this.state.navActive !== '2' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b'
            }
            }
            href="/createjob" 
            >
            اضافه کردن فرصت شغلی            
            </NavLink>
           
            <NavLink key='3' style={linkStyles.base} rightEl={<GiIceCube style={linkStyles.Icon} />} className={this.state.navActive === '3' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'3' })}
            style={this.state.navActive !== '3' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/jobs"
            >
            مشاهده فرصتهای شغلی
            </NavLink>

            <NavLink key='4' style={linkStyles.base} rightEl={<BsPerson style={linkStyles.PersonIcon} />} className={this.state.navActive === '4' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'4' }) } style={this.state.navActive !== '4' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/candidates"
            >
             کاندید ها
            </NavLink>

            <NavLink key='5' style={linkStyles.base} rightEl={<IoIosUmbrella style={linkStyles.Icon} />} className={this.state.navActive === '5' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'5' })} style={this.state.navActive !== '5' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/insurance"
            >
            بیمه تکمیلی 
            </NavLink>

            <NavLink key='6' style={linkStyles.base} rightEl={<FiBook style={linkStyles.Icon} />} className={this.state.navActive === '6' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'6' })} style={this.state.navActive !== '6' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/education"
            >
            آموزش 
            </NavLink>

            <NavLink key='7' style={linkStyles.base} rightEl={<FiPieChart style={linkStyles.Icon} />} className={this.state.navActive === '7' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'7' })} style={this.state.navActive !== '7' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/management"
            >
            مدیریت عملکرد
            </NavLink>

            <NavLink key='8' style={linkStyles.base} rightEl={<AiFillDollarCircle style={linkStyles.Icon} />} className={this.state.navActive === '8' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'8' })} style={this.state.navActive !== '8' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/finance"
            >
            اطلاعات مالی
            </NavLink>

            <NavLink key='9' style={linkStyles.base} rightEl={<AiOutlineLike style={linkStyles.Icon} />} className={this.state.navActive === '9' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'9' })} style={this.state.navActive !== '9' ? {fontFamily:'IranSans'} : {...linkStyles.base, borderStyle:'solid',
            borderWidth:'0px 5px 0px 0px',
            borderColor:'#50d48b',
            }
            }
            href="/feedback"
            >
            بازخورد
            </NavLink>
            <NavLink pill key='10' style={linkStyles.base} rightEl={<FiLogOut style={linkStyles.Icon} />} className={this.state.navActive === '10' ? 'active' :' ' }
            onClick={() => this.setState({ navActive:'10' })} style={{fontFamily:'IranSans'}}
            href="/logout"
            >
            خروج
            </NavLink>

        </NavSection>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </NavPanel>
      </ContainerHorizontal>
      </ContainerVertical>
      </BrowserRouter>
    )
  }
}

export default Radium(Sidebar)
