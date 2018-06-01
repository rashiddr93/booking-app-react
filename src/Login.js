import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

var apiBaseUrl = "http://10.2.0.101:4000/api/v1/";
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      menuValue:1
    }
  }
  handleClick(event){
    var self = this;
    var payload={
      "email":this.state.email,
	    "password":this.state.password
    }
    // axios.post(apiBaseUrl+'sign_in', payload, config: { headers: {'Content-Type': 'application/json' }})
    axios({
      method: 'post',
      url: apiBaseUrl+'sign_in.json',
      data: payload,
      config: { headers: {'Content-Type': 'application/json' } }
    }).then(function (response) {
     console.log(response);
     if(response.data.success == true ){
       alert("Login successfull");
     }
     else if(response.data.success == false){
       alert(response.data.messages)
     }
     else{
       alert("Error");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        
        <MuiThemeProvider>
          <div>
           <TextField
             floatingLabelText="Email"
             onChange = {(event,newValue)=>this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
       </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
