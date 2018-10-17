import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import ReactDom from 'react-dom'
import store from './Store/store'

import './App.css';

// const store = createStore(update)

class App extends Component {
  render() {
    return (
    <Provider store={store}>
        <div className="App">
            <div className="main">
                {this.props.children}
            </div>
        </div>
    </Provider>
    );
  }
}
export default App;

