import logo from './logo.svg';
import './App.css';
import SideMenu from"./components/SideMenu.js";
import UpperMenue from './components/UpperMenue';
import ItemBox from './components/ItemBox';
import React, { Component } from 'react';
import ItemInputPage from './components/ItemInputPage';
import SearchBox from './components/FilterBox';
import {Routes, Route, useNavigate} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      atHistoryPage: true,
      atWhichPage: "search",
      searchString: "",
      priceRange: "--Please choose an option--",
      category:"--Please choose an option--",
      itemsFiltered: [],
      thisUser: "",
      userOwnedItemList: []
    };
    this.handleSideMenuClick = this.handleSideMenuClick.bind(this);

    this.handleUpperMenuClick = this.handleUpperMenuClick.bind(this);
    this.handleEnterInSearch = this.handleEnterInSearch.bind(this);
  }
  handleSideMenuClick(name) {
    if(name==="Post New Item") {
      this.setState({atHistoryPage: false});
    } else {
      this.setState({atHistoryPage: true});
      const url = "";
      const getItemURL = `${url}/api/items`;
      fetch(getItemURL, {
        method: "GET",
        mode: 'no-cors'
      }).then((response) => {
        if(!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        
        }
        return response.json();
      }).then((res) => {
        this.setState({userOwnedItemList: res});
      });
    }
  }

  handleUpperMenuClick(name) {
    if(name === "Search Page") {
      this.setState({ atWhichPage: "search"});
    }

    if(name === "Item Page") {
      this.setState({ atWhichPage: "item"});
    }
  }

  handleEnterInSearch() {
    const url = "";//set it to empty when it is localhost
    console.log(`${url}/api/items/search?keywords=${this.state.searchString}`);
    if(this.state.searchString.length!=0) {
      let apiURL = `${url}/api/items/search?keywords=${this.state.searchString}`;
      if(this.state.priceRange!= "--Please choose an option--") {
        if(this.state.priceRange.includes(">")) {
          const lowerBound = this.state.priceRange.split(">");
          //console.log(lowerBound);
          apiURL+=`&price=gt${parseFloat(lowerBound[1])}`;
        } else {
          const lowerBound = this.state.priceRange.split(",").map((num) => {return parseFloat(num)});

          //console.log(this.state.priceRange.split(","));
          apiURL+=`&price=gt${lowerBound[0]}&price=lt${lowerBound[1]}`;
        }
        
      }

      if(this.state.category != "--Please choose an option--") {
        apiURL+=`&category=${this.state.category}`;
      }
      console.log(apiURL);
      fetch( apiURL, 
      {method: "GET", mode: 'no-cors'})
      .then((response) => {
        console.log(response);
        console.log("method ends");
        if(!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        
        return response.json();
      }).then((result) => {
        
        this.setState({itemsFiltered: result});
      });

    

    }
    


  }

  handleItemDelete(id) {
    const url = "";//set it to empty when it is localhost
    const deleteURL = `${url}/api/items/${id}`;
    fetch(deleteURL, {
      method: 'DELETE'
    }).then((response) => {
      if(response.status != 200) {
        throw new Error("Can not be deleted");
      } else {
        let copyItemArray = [...this.state.userOwnedItemList];
        
        this.setState({userOwnedItemList: copyItemArray.filter((item, index, arr) => {return item._id != id})});
      }
    })
  }

  render() {
    
    const itemList = [
      {
        id:"1",
        imgPath: "https://images2.giant-bicycles.com/b_white,c_pad,h_850,q_80/pbbsrk9upf0yug7yp3oa/MY22ATX27-5_ColorBVibrantBlue.jpg",
        title: "Road Bike",
        price: "20",
        category: "bike",
        description: "This is a bike"
      },
      {
        id: "2",
        imgPath: "https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG",
        title: "Use Iphone",
        price: "100",
        category: "cell phone",
        description: "a 95% new iphone only used for 2 months"
      }
    ]
    console.log( this.state.userOwnedItemList);
    const ItemBoxList = this.state.userOwnedItemList.map((item)=>{
      return <li key={item._id}>{<ItemBox onDelete={() => {this.handleItemDelete(item._id)}} hasAction={true} imgPath={item.picturePath} title={item.title} price={item.price} category={item.category} description={item.description}/>}</li>
    });
    let MainPageItem = null; 
    if(this.state.atHistoryPage) {
      MainPageItem =  <div className="main"><ul>{ItemBoxList}</ul></div>;
    }else {
      MainPageItem = <div className='main'><ItemInputPage/></div>
    }
    let MainPage = null;
    if(this.state.atWhichPage === "search") {
      MainPage = <div  className="downBackground"><SearchBox onSearchStringChange={(searchString) => {this.setState({searchString:searchString })}} searchString={this.state.searchString} onPriceRangeChange={(range)=> {this.setState({priceRange: range})}} priceRange={this.state.priceRange} onCategoryChange={(category)=>{this.setState({category: category})}} category={this.state.category} pressEnter={this.handleEnterInSearch} itemsFiltered = {this.state.itemsFiltered} /></div>
    } else if(this.state.atWhichPage === "item") {
      MainPage = (
        <div  className="downBackground">
        <SideMenu onClick={this.handleSideMenuClick}/>
        {MainPageItem}
      </div>
      )
    }

    const content = (
      <div className='wholeBackground'>
      <UpperMenue onClick={this.handleUpperMenuClick}/>
      {MainPage}
      </div>
    );
    //console.log(ItemBoxList);
    return (
      <Routes>
        <Route path="/" element={content}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    );
  }
  
  
}

