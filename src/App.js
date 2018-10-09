import React, { Component } from 'react';
// import Nav from  './components/Nav/Nav'
import Header from  './components/head/header'
import Footer from './components/footer/footer'

// import http from './common/index'
// global.http = http;
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-head">
          <Header/>
              <div className="main">
                  {this.props.children}
              </div>
          <Footer/>
        </div>
      </div>
    );
  }
}
export default App;

