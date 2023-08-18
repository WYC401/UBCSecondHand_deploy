import React from 'react';
import "../App.css";
export default class ItemInputPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            title: '',
            price: 0,
            category: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        if(event.target.className === 'itemTitleInput') {
            this.setState({title: event.target.value})
        }
        if(event.target.className === 'itemPriceInput') {
            this.setState({price: parseFloat(event.target.value)})
        }
        if(event.target.className === 'itemCategoryInput') {
            this.setState({category: event.target.value})
        }
        if(event.target.className === 'itemDescrpitionInput') {
            this.setState({description: event.target.value})
        }
        
    }
    //https://reactjs.org/docs/forms.html
    render() {
        const inputStyle={
            width: "100%",
            padding: "8px 0px",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            borderSizing: "boder-box"
        }
        return (
            //https://www.w3schools.com/css/tryit.asp?filename=trycss_forms
            <form className='itemInputForm'>
                <div id='title' style={{display: "block"}}>
                    <label for='title'>Title:</label>
                    <input type='text' className='itemTitleInput' id='title' value={this.state.title} onChange={this.handleChange} style={inputStyle}></input>

                </div>
                <div id='price' style={{display: "block"}}>
                    <label for='price'>Price:</label>
                    <input type='number' className="itemPriceInput" id='price' value={this.state.price} onChange={this.handleChange} style={inputStyle}></input>
                </div>
                
                <div id='category' style={{display: "block"}}>
                    <label for='category'>Category:</label>
                    <input type='text' className="itemCategoryInput" id='category' value={this.state.category} onChange={this.handleChange} style={inputStyle}></input>
                </div>
                <div id='description' style={{display: "block"}}>
                    <label for='description'>Description:</label>
                    <input type='text' className='itemDescrpitionInput' id='description' value={this.state.description} onChange={this.handleChange} style={inputStyle}></input>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}
