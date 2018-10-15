/**
 * Created by Administrator on 2018/4/12.
 */
import React, { Component } from 'react';
import './login.css'
import md5 from 'js-md5'
import {reactLogin} from '../../api/service'
// import * as LoginActions from '../../Action/loginAction'
import {Link} from 'react-router-dom'
import Footer from './../../components/footer/footer'
import { Form, Icon, Input, Button, Checkbox, message ,Row, Col} from 'antd'
const FormItem = Form.Item;


class login extends Component {
    constructor() {
        super()
        this.state = {
            errText: '',
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                let loginParam = {
                    langType: 1,
                    userName: values.userName,
                    password: md5(values.password).toLocaleUpperCase()
                }
                reactLogin(loginParam).then(res => {
                    if(res.code === "0"){
                        // message.success("登录成功")
                        this.props.history.push('/ProductList')
                    }else {
                        this.setState({
                            errText: res.msg
                        })
                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
        return (
            <div className="loginContainer">
                <div className="head-er">
                    <Row>
                        <Col span={18}>
                            <p className="title">欢迎登录</p>
                        </Col>
                    </Row>
                </div>
                <div className="loForm-con">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        {this.state.errText ?
                            <div className="err-block">
                                <Icon type="info-circle" theme="outlined" />
                                <span>{this.state.errText}</span>
                            </div> :null
                        }

                        <FormItem{...formItemLayout} label="账号">
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <a className="login-form-forgot" href="">Forgot password</a>
                            {/*<a className="login-join" href="">Join free</a>*/}
                            <Link to="/register" className="login-join">
                                Join free
                            </Link>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <Footer/>
            </div>
        );
    }
}
const Login = Form.create()(login);
export default Login;