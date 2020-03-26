import React, { Component } from 'react'
import {
  Table,Container, Row, Col

} from 'reactstrap';

import Utils from './utils'
import Markdown from 'react-markdown';
import correct from '../img/correct.png'
const url = Utils.config.urlBase

class ProblemStatement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contestCode: this.props.contestCode,
      problemCode: this.props.problemCode,
      problemName:'',
      problemBody:null,
      toggle:false,
      successSubmissions: [],
    }
  }

  componentDidMount () {
    const contestUrl = url + '/contests/' + this.state.contestCode+'/problems/'+this.state.problemCode
    var token = window.localStorage.access_token
    const self = this
    Utils.getSecureRequest(contestUrl, token, function (err, res) {
      if (!err) {

        self.setState({ problemName: res.problemName, problemBody:res.body})

      } else {
        window.alert(res)
      }
    })

    const successUrl= url+'/submissions/?problemCode='+this.state.problemCode+'&contestCode='+this.state.contestCode
    Utils.getSecureRequest(successUrl, token, function (err, res) {
      if (!err) {

        self.setState({ successSubmissions:res})

      } else {
        window.alert(res)
      }
    })
  }


  toggle = (e) => {
    if( this.state.toggle === false ){

        this.setState({toggle:true})
    }
    else{
      this.setState({toggle:false})
    }


  }

  Whatwillreturn(){
    if(this.state.toggle === false)
      return(<p style={{textAlign: 'center',fontSize: '16px'}}>Submit</p>)
    else{
      return (<p style={{textAlign: 'center',fontSize: '16px'}}>No API for making a submission to a problem</p>)
    }
  }


  render () {

    var items = null
    if (this.state.successSubmissions && this.state.successSubmissions.length > 0) {
      items = this.state.successSubmissions.map(function (i) {

        return (

          <tr >
            <td style={{fontSize:15}}>

            {(() => {
              var ts = new Date(i.date);
              return(ts.toString())
              })()}
            </td>
            <td style={{fontSize:15}}><a target='_blank' href= {Utils.config.urlMain+'/users/'+i.username}>{i.username}</a></td>
            <td style={{fontSize:15}}> {i.problemCode} </td>
            <td style={{fontSize:15}}> <img src={correct} style={{height:20,width:20}}/> </td>
            <td style={{fontSize:12,fontWeight: '100'}}> {i.language} </td>
          </tr>
        )
      })
    }
      var submissionsView  = <div style={{justifyContent:'center',marginTop:100}}>
      <div>
        <p style={{marginTop:30,fontFamily:'Baskerville',fontWeight:'500',fontSize:'25px'}}>Recent Successful Submissions</p>
        <Table bordered size="sm">
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
            {items }
          </tbody>
        </Table>
      </div>
    </div>


      return (

        <div style={{alignItems:'center'}}>

        <Container className="themed-container" fluid={true} >
        <p style={{fontSize:'50px',marginLeft:80}}>Problem:<u>{this.state.problemName}</u></p>
         <Row xs="2" >
           <Col style={{alignItems:'center',marginTop:10,position: 'relative',
           mozBoxShadow: '1px 2px 4px rgba(0, 0, 0,0.5)',
           webkitBoxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
            boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',marginLeft:90}}>

           <Markdown escapeHtml={false} source={this.state.problemBody} />
           </Col>

           <Col style={{alignItems:'center',marginTop:10,position: 'relative',
           mozBoxShadow: '1px 2px 4px rgba(0, 0, 0,0.5)',
           webkitBoxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
            boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',marginLeft:10,marginRight:50}}>

           <button style={{ backgroundColor: '#06A6F9',
                                  border: 'none',
                                  color: 'white',
                                  padding: '15px 32px 0px',
                                  textAlign: 'center',
                                  textDecoration: 'none',
                                  display: 'inlineBlock',
                                  fontSize: '16px',
                                  alignItems:'right' ,
                                  cursor: 'pointer',
                                  marginTop:10
                                }} onClick={this.toggle}> {this.Whatwillreturn()}
            </button>
            <button style={{ backgroundColor: '#D9264C',
                                   border: 'none',
                                   color: 'white',
                                   padding: '15px 32px',
                                   textAlign: 'center',
                                   textDecoration: 'none',
                                   display: 'inlineBlock',
                                   fontSize: '16px',
                                   alignItems:'right' ,
                                   cursor: 'pointer',
                                   marginLeft:30
                                 }}> Run
             </button>
             {submissionsView}
            </Col>
         </Row>
        </Container>
        </div>


      )
  }
}

export default ProblemStatement
