import React, { Component } from 'react'
import {
  Table,

} from 'reactstrap';

import Utils from './utils'


const url = Utils.config.urlBase

class RankList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contestCode: this.props.contestCode,
      userlist:[],
    }
  }

  componentDidMount () {
    const contestUrl = url + '/contests/' + this.state.contestCode
    var token = window.localStorage.access_token
    const self = this

    const getrank= url+'/rankings/'+this.state.contestCode
    Utils.getSecureRequest(getrank, token, function (err, res) {
      if (!err) {
        self.setState({userlist:res})


      } else {
        window.alert(res)
      }
    })


  }



  render () {





    var ranks =null
    if (this.state.userlist && this.state.userlist.length > 0) {
      ranks = this.state.userlist.map(function (i) {
        return (

           <tr>
                <td>{i.rank}</td>
                <td>{i.username}</td>
                <td>{i.totalScore}</td>
                <td>{i.totalTime}</td>
                <td>{i.penalty}</td>
            </tr>

        )
      })
    }


    var rankingView =
    <div style={{ justifyContent: 'center', marginTop: 30 }}>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>Rank</th>
              <th >User name </th>
              <th> Score </th>
              <th> Total Time </th>
              <th> Penalty</th>
            </tr>
          </thead>
          <tbody>
            {ranks}
          </tbody>
        </Table>
      </div>
    </div>





    return (

      <div>
        <p style={{textAlign: 'center', justifyContent: 'center',fontSize: 21,marginTop:40,fontWeight:'600'}}>
          RANKS - <a href={Utils.config.urlMain+'/rankings/'+this.state.contestCode} target='_blank'>{this.state.contestCode}</a>
         </p>
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>

            <div style={{ width: '60%' }}>
            {rankingView}
            </div>

        </div>


      </div>


    )
  }
}

export default RankList
