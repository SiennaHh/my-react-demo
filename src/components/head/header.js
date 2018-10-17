import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getInfo} from '../../Action/newAction'
import {getCurrentUser} from '../../api/service'
import { Row, Col } from 'antd';
import "./header.css"

class Header extends Component {
    constructor(){
        super()
        this.state = {
            userInfo: ''
        }
    }
    componentWillMount(){
        getCurrentUser().then(res => {
            console.log(res.data)
            if(res.code === "0"){
                this.setState({
                    userInfo: res.data
                })
                this.addInfo()
            }
            if(res.code === "401"){
                this.clearInfo()
            }
        }).catch(err => {
            console.log(err.msg)
        })
    }
    clearInfo = () => {
        this.props.getInfo()
        var storage = window.localStorage;
        storage.setItem("userInfo",null)
        this.setState({
            userInfo: null
        })
    };
    addInfo = () => {
        this.props.getInfo(this.state.userInfo)
        var storage = window.localStorage;
        storage.setItem("userInfo",JSON.stringify(this.state.userInfo))
    };

    render() {
        const { number } = this.props
        return (
            <div className="head-er">
                <Row>
                    <Col span={18}>
                        <p className="title">Header</p>
                    </Col>

                    <Col span={6}>
                        <div className="login-block">
                            <span>
                                {number.userName}
                            </span>
                            {/*<span>1</span>*/}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
//拿数据
// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//         store: state
//     }
// }
const getNumber = state => {
    return {
        number: state.update.userInfo
    }
}
export default connect(
    getNumber,
    getInfo
)(Header)
