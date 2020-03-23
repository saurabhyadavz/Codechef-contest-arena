import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Page from 'page'
import Problems from './components/problems'
import Utils from './components/utils'

import Header from './components/header'


import 'bootstrap/dist/css/bootstrap.css'

function startHomeView () {
  ReactDOM.render(<Header />, document.getElementById('header'))
  ReactDOM.render(<App />, document.getElementById('root'))
}

function startOAuth2 (context) {
  var code = context.querystring.split('&')[0].split('=')[1]

  Utils.getTokenFirstTime(code, function (err, data) {
    if (!err) {
      window.localStorage.setItem('access_token', data.access_token)
      window.localStorage.setItem('refresh_token', data.refresh_token)
      Utils.moveTo('/')
    } else {
      window.alert(err)
    }
  })
}
function startProblemsView (context) {
  var code = context.params.code
  ReactDOM.render(<Header />, document.getElementById('header'))
  ReactDOM.render(<Problems contestCode={code} />,document.getElementById('root')
  )
}

function checkLogin (cxt, next) {
  if (Utils.isLogged()) next()
  else Utils.moveTo('/')
}

Page('/', startHomeView)
Page('/auth/codechef/callback', startOAuth2)
Page('/problems/:code', startProblemsView)
Page.start()

registerServiceWorker()
