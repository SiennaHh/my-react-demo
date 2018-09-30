/**
 * Created by Administrator on 2018/4/12.
 */
import React, { Component } from 'react';
import * as LoginActions from '../../Action/loginAction'
import {Link} from 'react-router-dom'

class Login extends Component {

  constructor(){
      super()
      this.state = {

      }
  }



  setLogin = ()=>{
    console.log(123);
    // 触发父组件的事件然后改变状态
    // this.props.onSetLogin()
    // 1.需要改变shopping组件里面的islogin状态
    // 2.进入产品罗列页面
    LoginActions.loginSuccess()
    // if(this.props.onSetLogin != undefined){
    //   this.props.onSetLogin()
    // }else {
    //   this.props.history.push('/ProductList')
    // }

    

  }
  render() {
    return (
        <div>
          <h1>Login</h1>
          {/*<button onClick={this.setLogin}>登录</button>*/}
          <button>
              <Link to="/ProductList">
                  登录
              </Link>
          </button>
        </div>
    );
  }
}
export default Login;