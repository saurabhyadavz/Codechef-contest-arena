import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Page from 'page'
import Problems from './components/problems'
import Utils from './components/utils'
import RankList from './components/ranklist'
import Header from './components/header'
import ProblemStatement from './components/problemstatement'
import 'bootstrap/dist/css/bootstrap.css'


function startHomeView () {
  var check =window.localStorage.getItem('refresh')
  if( check && check !== ''){
    Utils.clearSession()
    Utils.refreshToken()
    window.localStorage.setItem('refresh',100)

  }
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

function startRankList (context) {
  var code= context.params.code
  ReactDOM.render(<Header />, document.getElementById('header'))
  ReactDOM.render(<RankList contestCode={code} />,document.getElementById('root'))

}
function startProblemStatement(context) {
  var code=context.params.code
  var problemc=context.params.problemcode

  ReactDOM.render(<Header />, document.getElementById('header'))
  ReactDOM.render(<ProblemStatement contestCode={code} problemCode={problemc}/>,document.getElementById('root'))

}
function checkLogin (cxt, next) {
  if (Utils.isLogged()) next()
  else Utils.moveTo('/')
}

Page('/', startHomeView)
Page('/auth/codechef/callback', startOAuth2)
Page('/contest/:code',checkLogin, startProblemsView)
Page('/ranklist/:code',checkLogin,startRankList)
Page('/contests/:code/problems/:problemcode',startProblemStatement)
Page.start()

registerServiceWorker()
