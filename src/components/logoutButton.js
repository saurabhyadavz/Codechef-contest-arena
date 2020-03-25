import React, { Component } from 'react'
import Utils from './utils'
import { NavLink } from 'reactstrap'

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
        Log out
      </NavLink>
    )
  }
}

export default LogoutButton
