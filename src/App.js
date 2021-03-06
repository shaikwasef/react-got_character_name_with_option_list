import React from "react";
import "./style.css";
import axios from "axios";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {bookList : [] , nameList : []};
  }

  async componentDidMount(){
    const bookListfetch = await axios.get("https://www.anapioficeandfire.com/api/books");
    bookListfetch.data.forEach((dataArray) => {this.setState({bookList : this.state.bookList.concat(dataArray.name)})});
  }

  async getCharacters(event){
    const axiosRequests = [] ;
    this.setState({nameList : []});
    const fetchUrl = "https://www.anapioficeandfire.com/api/books/?name="+event.target.options[event.target.selectedIndex].text;
    const bookData = await axios.get(fetchUrl);
    bookData.data[0].characters.forEach((key) => axiosRequests.push(axios.get(key)));
    axios.all(axiosRequests).then(axios.spread((...responses) => responses.forEach((value) => this.setState({nameList : this.state.nameList.concat(value.data.name)}))));
  }

  render(){
    const bookNames = this.state.bookList.map((value , key) => {
      return (
        <option key = {key}>{value}</option>
      );
    });

    const names = this.state.nameList.map((value,key) => {
      return (
        <li key = {key}>{value}</li>
      );
    });
   
    return(
      <div>
      <select onChange = {() => this.getCharacters(event)}>{bookNames}</select>
      {names}
      </div>
    );
  }
}

export default App;