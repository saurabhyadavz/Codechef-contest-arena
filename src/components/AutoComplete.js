import React, {Component} from 'react'
import './AutoComplete.css'
import Utils from './utils'

var items=[];
var mappeditems= new Map();
export default class AutoComplete extends Component{
  constructor(props){
    super(props);

    this.state={
      suggestions:[],
      text:'',


    };
  }

componentDidMount(){
  var token = window.localStorage.getItem('access_token')
  var url = `${Utils.config.urlBase}/contests?status=past&limit=100`

  Utils.getSecureRequest(url, token, function (err, data){
    if (!err) {
      data = data.contestList
      for (var i = 0; i < data.length; ++i) {
        items.push(data[i].code)
        mappeditems.set(data[i].name,data[i].code);
        mappeditems.set(data[i].code,data[i].code);
      }
      for (var i = 0; i < data.length; ++i) {
        items.push(data[i].name)
      }
    }

  })
}

  onTextChanged = (e) =>{
    const value=e.target.value;
    let suggestions =[];
    if(value.length >0){
      const regex =new RegExp(`^${value}`,'i');
      suggestions=items.sort().filter(v => regex.test(v));

    }
    this.setState(() => ({suggestions ,text:value}));
  }

  suggestionSelected(value){
    this.setState(() => ({
      text:value,
      suggestions:[],
    }));

  }

  renderSuggestion(){
    const {suggestions} =this.state;
    if(suggestions.length==0){
      return null;

    }
    return (
      <ul>
        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    );
  }



  render() {

    var find= this.state.text;
    const {text}=this.state;

    return (
      <div>

        <div className="AutoComplete">
            <input value={text} onChange={this.onTextChanged}type="text" placeholder="Enter the Contest Name/Code.."/>
                {this.renderSuggestion()}
        </div>
        <div>

          <button  type="button" style={{marginTop:'40px'}} onClick={() =>  {Utils.moveTo(`/problems/${mappeditems.get(find)}`)  }}>Submit</button>

        </div>
      </div>
    )
  }
}
