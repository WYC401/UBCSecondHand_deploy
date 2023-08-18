// import React, { Component } from 'react';
// import "../App.css";

// export default class RegisterPage extends  React.Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             email: "",
//             password:"",
//             confirmedPassword: ""
            
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         if(event.target.name === "email") {
//             this.setState({email: event.target.value});
//         }
//         if(event.target.name === "password") {
//             this.setState({password: event.target.value});
//         }
//         if(event.target.name === "confirmedPassword") {
//             this.setState({confirmedPassword: event.target.value});
//         }

//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         const url = "";
//         const apiURL = `${url}/api/auth/register`;
//         if(this.state.password !== this.state.confirmedPassword) {
//             //give a warning
//         } else {
//             fetch(apiURL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({username: this.state.email, password: this.state.password}),
//                 mode: 'cors'
//             }).then(
//                 (response) => {
//                     if(response.status == 302) {
//                         navigate('/login');
//                     }
//                     if(response.status == 201) {
//                         navigate("/");
//                     }

//                 }
//             )
//         }
        

//     }

//     render() {
//         return (
//             <div>
//                 <h1>Register</h1>

//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Email:
//                         <input type="text" name="email" value={this.state.email} onChange={this.handleChange}></input>
//                     </label>
//                     <br/>
//                     <label>
//                         Password:
//                         <input type="text" name="password" value={this.state.password} onChange={this.handleChange}></input>
//                     </label>
//                     <br/>
//                     <label>
//                         Confirm Password:
//                         <input type="text" name="confirmedPassword" value={this.state.confirmedPassword} onChange={this.handleChange}></input>
//                     </label>
//                     <br/>
//                     <button type="submit">login</button>
//                 </form>
//             </div>
//         )
//     }
// }
import React, { useState } from 'react';
import "../App.css";
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const handleChange = (event) => {
        if(event.target.name === "email") {
            setEmail(event.target.value);
        }
        if(event.target.name === "password") {
            setPassword(event.target.value);
        }
        if(event.target.name === "confirmedPassword") {
            setConfirmedPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "";
        const apiURL = `${url}/api/auth/register`;
        if(password !== confirmedPassword) {
            //give a warning
        } else {
            fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: email, password: password}),
                mode: 'cors'
            }).then(
                (response) => {
                    console.log(response.status );
                    if(response.status == 302) {
                        navigate('/login');
                    }
                    if(response.status == 200) {
                        navigate("/");
                    }

                }
            )
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" value={email} onChange={handleChange}></input>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="text" name="password" value={password} onChange={handleChange}></input>
                </label>
                <br/>
                <label>
                    Confirm Password:
                    <input type="text" name="confirmedPassword" value={confirmedPassword} onChange={handleChange}></input>
                </label>
                <br/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}