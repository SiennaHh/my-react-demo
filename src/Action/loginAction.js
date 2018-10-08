/**
 * Created by Administrator on 2018/4/13.
 */
//在这里我需要告诉dispatcher要去执行什么样的任务
import dispatcher from '../Dispatcher/Dispatcher'
export function loginSuccess() {
  // 告诉dispatcher分发任务的名称
  dispatcher.dispatch({
    type:"LOGIN"
  })
}