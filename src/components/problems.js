import React, { Component } from 'react'
import {
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col, Button, Popover, PopoverHeader, PopoverBody,
} from 'reactstrap';
import correct from '../img/correct.png'
import compile from '../img/compile.png'
import runtime from '../img/runtime.png'
import timelimit from '../img/timelimit.png'
import wrong from '../img/wrong.png'

import Countdown from "react-countdown";
import Utils from './utils'


const url = Utils.config.urlBase
const urlProblem = Utils.config.urlMain

class Problems extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contestCode: this.props.contestCode,
      contestName: '',
      problems: [],
      problemName:'',
      ContestDuration:5000,
      activity:[],
    }
  }

  componentDidMount () {
    const contestUrl = url + '/contests/' + this.state.contestCode+'?sortBy=successfulSubmissions&sortOrder=desc'
    var token = window.localStorage.access_token
    const self = this
    Utils.getSecureRequest(contestUrl, token, function (err, res) {
      if (!err) {
        const start= new Date(res.startDate).getTime();
        const end=new Date(res.endDate).getTime();
        const duration=end-start;
        self.setState({ contestName: res.name, contestCode: res.code, problems: res.problemsList, ContestDuration: duration})

      } else {
        window.alert(res)
      }
    })

    const recentsubmissionUrl= url+'/submissions/?contestCode='+this.state.contestCode
    Utils.getSecureRequest(recentsubmissionUrl, token, function (err, res) {
      if (!err) {

        self.setState({activity:res})


      } else {
        window.alert(res)
      }
    })


  }



  render () {


    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        window.location='/';

      } else {

        return (
            <div style={{fontSize:'25px'}}>
                <div>
                  Contest Ends in
                </div>
                <div>
                    <span>{hours}:{minutes}:{seconds}</span>
                </div>
            </div>
        );
      }
    };


    var items = null
    if (this.state.problems && this.state.problems.length > 0) {
      items = this.state.problems.map(function (i) {
        return (
          <tr key={i.problemCode}>
            <td>
              <a
                target='_blank'
                href={urlProblem + '/' + i.contestCode + '/problems/' + i.problemCode}>
                {i.problemCode}
              </a>
            </td>
            <td> {i.problemCode} </td>
            <td> {i.successfulSubmissions} </td>
            <td> {parseFloat(i.accuracy).toFixed(2)} </td>
          </tr>
        )
      })
    }

    var submissionlist=null
    if(this.state.activity && this.state.activity.length > 0){
      submissionlist=this.state.activity.map(function(i){

        return(

          <tr key={i.id}>
            <td style={{fontSize:15}}>{i.date}</td>
            <td style={{fontSize:15}}>{i.username}</td>
            <td style={{fontSize:15}}>{i.problemCode}</td>
            <td style={{fontSize:15}}> {i.result} </td>
            <td style={{fontSize:15}}>{i.language}</td>
          </tr>
        )
      })
    }

    var problemsView = <div style={{ justifyContent: 'center', marginTop: 50 }}>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th > Name </th>
              <th> Code </th>
              <th> Successful submissions </th>
              <th> Accuracy </th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      </div>
    </div>


    var recentActivity = <div style={{justifyContent:'center',marginTop:10}}>
      <div>
        <p style={{marginTop:30}}>Recent Activity</p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{fontSize:15}}> Date </th>
              <th style={{fontSize:15}}> User </th>
              <th style={{fontSize:15}}> Problem Code </th>
              <th style={{fontSize:15}}> Result </th>
              <th style={{fontSize:15}}> Laungauge </th>
            </tr>
          </thead>
          <tbody>
            {submissionlist}
          </tbody>
        </Table>
      </div>



    </div>

    return (

      <div>

        <p style={{textAlign: 'center', justifyContent: 'center',fontSize: 20,marginTop:60,fontWeight:50}}>{this.state.contestName}</p>
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>


            <div style={{ width: '60%' }}>
            {problemsView}
            </div>

            <div style={{textAlign: 'center', justifyContent: 'center',fontSize: 20,marginTop: 50,  marginLeft: 40,}}>
                    <Countdown date={Date.now() + this.state.ContestDuration} renderer={renderer} />
                      {recentActivity}
            </div>




        </div>


      </div>


    )
  }
}

export default Problems
