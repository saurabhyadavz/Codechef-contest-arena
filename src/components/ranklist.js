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
                <td >{i.rank}</td>
                <td>
                {(() => {
                    if( i.rating <= 1399){
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#857E7A',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }
                    else if( i.rating >=1400 && i.rating <=1599 ){
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#6BB946',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }
                    else if( i.rating >=1600 && i.rating <=1799 ){
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#018BFE',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }
                    else if( i.rating >=1800 && i.rating <=1999 ){
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#9D4CB3',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }
                    else if( i.rating >=2000 && i.rating <=2199 ){
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#FFFC00',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }
                    else if( i.rating >=2200 && i.rating <=2499 ){
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#E58A1A',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }
                    else{
                      return(
                        <a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username} style={{fontSize:20,color:'#E71918',fontWeight:'600'}}>
                          {i.username}
                        </a>
                      )
                    }

                })()}

                </td>
                <td>{i.totalScore}</td>
                <td>{i.totalTime}</td>
                <td>
                  {(() => {
                      if( i.penalty >0 ){
                        return(
                          <p style={{color:'red'}}> ({i.penalty})</p>
                        )
                      }
                      else{
                        return(
                          <p style={{color:'green'}}> ({i.penalty})</p>
                        )
                      }

                  })()}

                </td>
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
              <th>RANK</th>
              <th >USER NAME </th>
              <th> SCORE </th>
              <th> TOTAL TIME </th>
              <th> PENALTY</th>
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
          RANKS - <a href={Utils.config.urlMain+'/rankings/'+this.state.contestCode} target='_blank'>
          {(() => {
            var s=this.state.contestCode
              return(s.toUpperCase())
          })()}
          </a>
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
