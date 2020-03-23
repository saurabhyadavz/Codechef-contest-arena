import React, {Component} from 'react'
import './AutoComplete.css'
import Utils from './utils'
export default class AutoComplete extends Component{
  constructor(props){
    super(props);
    this.items=[
      'Saurabh',
      'Abhishek',
      'Khan',
      'Yadav',
      'Yd',
    ];
    this.state={
      suggestions:[],
      text:'',
    };
  }

  onTextChanged = (e) =>{
    const value=e.target.value;
    let suggestions =[];
    if(value.length >0){
      const regex =new RegExp(`^${value}`,'i');
      suggestions=this.items.sort().filter(v => regex.test(v));

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
    const {text}=this.state;
    return (
      <div>

        <div className="AutoComplete">
            <input value={text} onChange={this.onTextChanged}type="text" placeholder="Enter the Contest Name/Code.."/>
                {this.renderSuggestion()}
        </div>
        <div>

          <button  type="button" style={{marginTop:'40px'}} onClick={() => { Utils.moveTo(`/problems/${text}`) }}>Submit</button>

        </div>
      </div>
    )
  }
}
