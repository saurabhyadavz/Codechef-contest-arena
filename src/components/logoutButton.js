import React, { Component } from 'react'
import Utils from './utils'
import { NavLink } from 'reactstrap'
import './button.css'

class LogoutButton extends Component {
  onClick () {
    console.log('Logoutcheck')
  }

  handleClick () {
        Utils.logout()
  }

  render () {
    return (
      <NavLink href='#' onClick={this.handleClick}>
      <button className= "button logout">Logout</button>
      </NavLink>
    )
  }
}

export default LogoutButton
