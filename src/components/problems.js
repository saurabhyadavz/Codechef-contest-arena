import React, { Component } from 'react'
import { Table } from 'reactstrap'
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
      ContestStartDate:null,
      ContestEndDate:null,
      ContestDuration:9000,
    }
  }

  componentDidMount () {
    const contestUrl = url + '/contests/' + this.state.contestCode
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


  }


  render () {
    const Completionist = () => <span>You are good to go!</span>;


    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        window.location='/';

      } else {

        return (
            <div style={{marginTop:'50px',textAlign:'center',fontSize:'30px',fontFamily: 'lucida grande'}}>
                <div>
                  Contest Ends in
                </div>
                <div>
                    {hours}:{minutes}:{seconds}
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

    var problemsView = <div style={{ justifyContent: 'center', marginTop: 20 }}>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th> Name </th>
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

    return (

      <div>
        <div>
          <p style={{textSize:'30px'}}>{this.state.contestName}</p>
            {problemsView}
            <Countdown date={Date.now() + this.state.ContestDuration} renderer={renderer} />
        </div>

      </div>
    )
  }
}

export default Problems
