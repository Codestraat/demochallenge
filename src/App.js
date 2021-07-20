import React, { Component } from 'react'
import axios from 'axios';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      search:"",
      list:[]
    }
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  onClick=()=>{
    axios.get(`https://api.foursquare.com/v2/venues/search?client_id=PIMX4RZ2HX4KP02MFV0HYS1YGA2OWW42TH03U3BADLSXFJYM&client_secret=WSCBAUW1F2CONZWA0A1QCZDK5TDBQNN0NMDMNANQ4ERWII1T&ll=40.7,-74&query=${this.state.search}&v=20210430`)
    .then((response)=>{
      this.setState({
        list:response.data.response.venues
      })
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  render() {
    return (
      <div style={{margin: "auto", width:"300px", alignItems:"center"}}>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" name="search"  onChange={this.onChange} value={this.state.search}/>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.onClick}>Submit</button>
        </form>
        <br/>
        <ul className="list-group ">
          {this.state.list.map((value)=>{
            return(
              <li className="list-group-item bulleted" key={value.id}>{value.name} - {value.location.address}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}
