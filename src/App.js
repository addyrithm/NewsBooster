import './App.css';
import Navbar from './Components/Navbar'
import React, { Component } from 'react'
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  state ={progress:0}
  setProgress = (progress) => {this.setState({progress: progress})}
  render() {
    return (
      < >
      <div>
        <Router>
         <Navbar/>
         <LoadingBar color='red' height={2} progress={this.state.progress} />
         <Routes>
            <Route path="/general" element = {<News setProgress={this.setProgress} apikey={this.apikey} country="in" category="General"/>}></Route>
            <Route path="/business" element = {<News setProgress={this.setProgress} apikey={this.apikey} country="in" category="Business"/>}></Route>
            <Route path="/entertainment" element = {<News setProgress={this.setProgress} apikey={this.apikey} country="in" category="Entertainment"/>}></Route>
            <Route path="/health" element = {<News setProgress={this.setProgress} apikey={this.apikey} country="in" category="Health"/>}></Route>
            <Route path="/science" element = {<News setProgress={this.setProgress} apikey={this.apikey} country="in" category="Science"/>}></Route>
            <Route path="/technology" element = {<News setProgress={this.setProgress} apikey={this.apikey} country="in" category="Technology"/>}></Route>
            <Route path="/about" element = {<News setProgress={this.setProgress} apikey={this.apikey}country="in" category="About"/>}></Route>
         </Routes>
        </Router>
      </div>
    </>
    )
  }
}

