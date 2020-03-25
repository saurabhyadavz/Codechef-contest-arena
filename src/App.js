import React, { Component } from 'react'
import Utils from './components/utils'
import './App.css'

import AutoComplete from './components/AutoComplete'


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
      home =
      <div className="App">

        <div className="App-Component">

          <div className="App-Component">

              <AutoComplete />
          </div>

        </div>
      </div>

    }

    var errorPage = <div> <h2> LocalStorage not supported! </h2> </div>

    return (
      (this.state.localStorageSupported ? home : errorPage)
    )
  }
}

export default App
