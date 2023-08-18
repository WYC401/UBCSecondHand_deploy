import React from 'react';
import "../App.css";
class MenuItem extends React.Component {
    render() {
       return (
       <div><span onClick={() => {this.props.onClick(this.props.name)}}> {this.props.name} </span></div>
       );
    }
}

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render() {
        return (
            <div id="ItemSideMenu" className="sidenav">
             <MenuItem  name="Post History" onClick={this.props.onClick}/>
             <MenuItem  name="Post New Item" onClick={this.props.onClick}/>
            </div>
        )
        
    }
}

