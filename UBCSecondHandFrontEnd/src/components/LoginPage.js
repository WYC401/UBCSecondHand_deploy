import React, { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// export default class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             password: "",
//             navigate: useNavigate()
//         }
//         this.handleSubmit=this.handleSubmit.bind(this);
//         this.handleUsernameChange=this.handleUsernameChange.bind(this);
//         this.handlePasswordChange=this.handlePasswordChange.bind(this);
//     }
//     handleUsernameChange(event) {
//         if(event.target.id === "username") {
//             this.setState({username: event.target.value});
//         }
//     }
//     handlePasswordChange(event) {
//         if(event.target.id === "password") {
//             this.setState({password: event.target.value});
//         }
//     }
//     handleSubmit(event) {
//         event.preventDefault();
//         const url = "";
//         //const navigate = useNavigate();
//         const authURL = `${url}/api/auth/login`;
//         fetch(authURL, {method: "POST", body: {username: this.state.username, password : this.state.password}})
//         .then((response) => {
//             const res = response.json();
//             if(res.status==201) {
//                 this.state.navigate('/');
//             }
//             else{
//                 this.setState({username: "", password: ""});
//             }
//         })
//     }
    
//     render() {
        
//         return (
//             <div>
//               <h1>Login</h1>
//               <form onSubmit={this.handleSubmit}>
//                 <label>
//                   Username:
//                   <input type="text" id="username" value={this.state.username} onChange={this.handleUsernameChange} />
//                 </label>
//                 <br />
//                 <label>
//                   Password:
//                   <input type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
//                 </label>
//                 <br />
//                 <button type="submit">Submit</button>
//               </form>
//             </div>
//           );
//     }

  
// }


function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "";
    const handleUsernameChange = (event) => {
      if(event.target.id === "username") {
        setUsername(event.target.value);
      }
    };
  
    const handlePasswordChange = (event) => {
      if(event.target.id === "password") {
        setPassword(event.target.value);
      }
    };

  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      const authURL = `${url}/api/auth/login`;
      console.log(authURL);
      fetch(authURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({username: username, password:password}),
        mode: 'cors'
      })
        .then((response) => {
          
          //const res = response.json();
          if(response.status == 400) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
          } else if(response.status == 200) {
            navigate('/');
          } else {
            setUsername("");
            setPassword("");
          }
          //return response.json();
          
          }
        )
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">login</button>
          <a href={`${url}/register`}>New User</a>
        </form>
      </div>
    );
  }

  export default LoginPage;

