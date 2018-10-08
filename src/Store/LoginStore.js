import {EventEmitter} from 'events'
// 提供一个对象,这个对象提供所有数据的处理方法(set get)
// 导入dispatcher文件  该文件自己定义
import dispatcher from '../Dispatcher/Dispatcher'
class LoginStore extends EventEmitter{
  constructor(){
    super()
    this.isLogin = false
  }
  _getIsLogin(){
    return this.isLogin
  }
  _loginChange(){
    console.log(this.isLogin)
    this.isLogin = true
    console.log(this.isLogin)
  }
  handleAction(action){
    // 通过action传递过来type来判断执行哪个对state修改的函数
    console.log(action)
    switch (action.type){
      case 'LOGIN':{
        this._loginChange()
        break
      }
    }
  }
}

const loginStore = new LoginStore()
// dispatcher.register(绑定注册好的回调函数)
dispatcher.register(loginStore.handleAction.bind(loginStore))
export default loginStore