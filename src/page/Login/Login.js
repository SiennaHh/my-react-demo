/**
 * Created by Administrator on 2018/4/12.
 */
import React, { Component } from 'react';
import './login.css'
import {reactLogin} from '../../api/service'
// import * as LoginActions from '../../Action/loginAction'
import {Link} from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
const FormItem = Form.Item;


class login extends Component {
    constructor() {
        super()
        this.state = {}
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                reactLogin(values).then(res => {
                    if(res.code === "0"){
                        message.success("注册成功")
                    }
                }).catch(err => {
                    message.error(err.msg)
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
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>2</div>
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
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const Login = Form.create()(login);
export default Login;