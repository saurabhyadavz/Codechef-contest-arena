import React, { Component } from 'react'
import Utils from './utils'
import {
  Nav,
  NavLink,

} from 'reactstrap'
import Logout from './logoutButton'
import './button.css'
const url = Utils.config.urlBase

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: null
    }
  }

  componentDidMount () {
    this.handleInfoUser()
  }

  handleInfoUser = () => {
    const self = this
    const userURL = url + Utils.config.urlUser
    if(window.localStorage.getItem('expires_in') <= Date.now()){
      Utils.refreshToken()
    }
    var token = window.localStorage.getItem('access_token')
    Utils.getSecureRequest(userURL, token, function (err, data) {
      if (!err) {
        self.setState({ userInfo: data })
        window.localStorage.username = data.username
      } else {
        console.log('Error', err)
      }
    })
  }

  render () {
    let loginView = !this.state.userInfo
      ? <NavLink
        href='#'
        onClick={() => {
          Utils.clearSession()
          const callbackURL = url + Utils.config.urlAuthorize + '?response_type=code&client_id=' +
            Utils.config.clientID + '&state=xyz&redirect_uri=' + Utils.config.urlRedirect
            Utils.moveTo(callbackURL)
        }}
      > <button className="button login">Login</button>
      </NavLink>
      : <Logout/ >

    let user = this.state.userInfo
      ? <p
        style={{ fontWeight: 'bold', margin: 0 }}>
        <button button className="button user">{this.state.userInfo.username}</button>
      </p>
      :  <button className="button anonymous">Hey Anonymous</button>


    var header = <Nav>
      <NavLink  href='/'><button className="button home">Home</button></NavLink>
      <NavLink target='__blank' href={Utils.config.urlMain+'/users/'+window.localStorage.username}>{user}</NavLink>
          {loginView}

    </Nav>

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {header}
      </div>
    )
  }
}

export default Header
