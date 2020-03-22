import React, { Component } from 'react'


import Utils from './components/utils'
import {Alert,Badge} from 'reactstrap'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localStorageSupported: true
    }

    this.contestRef = React.createRef()
  }

  componentDidMount () {
    const self = this
    Utils.checkLocalStorage(function (err) {
      if (err) {
        self.setState({ localStorageSupported: false })
      }
    })
  }



  render () {


    let home = <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{fontSize:'20px'}}>Please login</p>
    </div>

    if (Utils.isLogged()) {
      home = <div>
        Welcome home
      </div >
    }

    var errorPage = <div> <h2> LocalStorage not supported! </h2> </div>

    return (
      (this.state.localStorageSupported ? home : errorPage)
    )
  }
}

export default App
