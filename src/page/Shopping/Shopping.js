/**
 * Created by Administrator on 2018/4/12.
 */
import React, { Component } from 'react';
import Login from '../Login/Login'
import LoginStore from '../../Store/LoginStore'
class Shopping extends Component {
  constructor(){
    super()
    this.state = {
      isLogin:LoginStore._getIsLogin()
    }
  }
  changeLogin=()=>{
    this.setState({
      isLogin:LoginStore._getIsLogin()
    })
  }
  render() {
    // 要做判断/
    return (
        <div>
          {this.state.isLogin?(<h1>Shopping页面</h1>):(<Login onSetLogin={this.changeLogin}/>)}
        </div>
    );
  }
}
export default Shopping;