import {USERINFO} from '../Store/constants'

const initState = {
    number: 1,
    userInfo: ''
};

// export default function update (state = initState, action) {
//     //根据不同的action type来进行state的更新
//     switch (action.type) {
//         case USERINFO:
//             return Object.assign({}, state, {userInfo: action.data})
//         default:
//             return state
//     }
// }

export const update = (state = initState, action = {}) => {
    switch (action.type) {
        case USERINFO:
            return Object.assign({}, state, {userInfo: action.data})
        default:
            return state
    }
}