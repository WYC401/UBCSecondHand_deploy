import React from 'react';
import "../App.css";
import profilePic from "../images/logo192.png";
import ubcPic from "../images/ubc-logo.png";
class Profile  extends React.Component {
    render() {
        return (<img src={profilePic} alt="" onClick={() => {this.props.handlePageTransit("Item Page")}}  style={{height: '100%', width: '20%', aspectRatio: 3/2}}></img>) ;
    }
}

class UBCLogo extends React.Component {
    render() {
        return (<img src={ubcPic} alt="" onClick={() => {this.props.handlePageTransit("Search Page")}} style={{height: '100%', width: '20%', aspectRatio: 3/2}} ></img>);
    }
}

export default class UpperMenue extends React.Component {
    render() {
        return(
            <div className='upperMenue'>
                <UBCLogo handlePageTransit={this.props.onClick}/>
                <Profile handlePageTransit={this.props.onClick}/>
            </div>  
        ); 
    }
}
