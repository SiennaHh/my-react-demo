import {USERINFO} from '../Store/constants'

export const getInfo = (data) => {
    // console.log(data)
    if(data == null){
        data = JSON.parse(window.localStorage.getItem("userInfo"))
    }
    console.log(JSON.parse(window.localStorage.getItem("userInfo")))
    return {
        type: USERINFO,
        data,
    }
}