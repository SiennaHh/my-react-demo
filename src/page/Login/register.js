import React, { Component } from 'react';
import {verifyPhoneNum, getAreaAndCode, sendPhoneCaptcha} from '../../api/service'
import './register.css'
import { Form, Input,   Select, Row, Col, Checkbox, Button,  Radio, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;



class Register extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        typeValue: 2,
        validUserName: true,
        validPassTip: false,
        countryData: [],
        canSend: true,
        count: 60,
        sendText: '发送验证码',
    };
    componentDidMount(){

        getAreaAndCode().then(res => {
            const countryData = res.data
            this.setState({countryData: countryData});
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    //确认密码
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    radioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    //密码验证
    validateToNextPassword = (rule, value, callback) => {
        const reg =/^(?!([\d]+|[a-zA-Z]+|[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+)$)[\w\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,20}$/;
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }else if(value && !reg.test(value)){
            callback('密码格式不正确！')
        }
        callback();
    }
    passChange = (value) => {
        this.setState(
            {validPassTip: true}
        )
        console.log(this.state.validPassTip)
    }
    //手机号验证
    validatePhone = (rule, value, callback) => {
        const reg = /^\d{4,11}$/
        if(value && !reg.test(value)){
            callback('手机号格式不正确！')
        }
        callback()
    }

    //用户名验证
    validUserName = (rule, value, callback) => {
        const reg = /(?=.*[\d])(?=.*[a-zA-Z])^[a-zA-Z]{1}[0-9A-Za-z_]{5,19}$/;
        if(value && !reg.test(value)){
            this.setState({validUserName: false})
            callback('用户名格式不正确！');
        }
        console.log(this.state.validUserName)
        callback()
    }
    //Select选择器
    selectChange = (value) => {
        console.log(`selected ${value}`);
    }
    selectFocus = (value) =>  {
        console.log('blur');
    }
    selectBlur = (value) =>  {
        console.log('focus');
    }

    GenNonDuplicateID = (randomLength) => {
        return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
    }


    //发送验证码
    sendCapt = (hh) => {
        const form = this.props.form;
        if(form.getFieldValue('phone') === undefined){
            message.error('请先输入手机号！')
            return;
        }
        let param = {
            mobilePhone: form.getFieldValue('phone')
        };
        verifyPhoneNum(param).then(res => {
                console.log(res)
                if(res.code === "0"){
                    let code = {
                        codeType: 1,
                        mobilePhone: '+' + form.getFieldValue('prefix') + '-' + form.getFieldValue('phone'),
                        title: 'Registration of ca-b2b',
                        token: this.GenNonDuplicateID()
                    }
                    sendPhoneCaptcha(code).then(res => {
                        if(res.code === "0"){
                            message.success("验证码发送成功！");
                            this.setState({
                                canSend: false
                            })
                            this.Countdown();
                        }else {
                            message.error(res.msg);
                        }
                    })
                }else {
                    message.error(res.msg);
                }
            })
    };
    //倒计时
    Countdown = () =>{
        this.timer = setInterval(() => {
            let currentCount = this.state.count -=1;
            console.log(currentCount)
            this.setState({
                canSend: false,
                count: currentCount,
                })
            if(currentCount === 0){
                clearInterval(this.timer)
                this.setState({
                    canSend: true,
                    count: 60,
                    sendText: '重新发送验证码'
                })
            }
        },1000)
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 150 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
                {this.state.countryData.map((coun,i) => {
                    return <Option key={i} value={coun.countryPhoneCode}>{coun.code}+{coun.countryPhoneCode}</Option>
                })}
            </Select>
        );


        return (
            <div className="regis-block">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem{...formItemLayout} label="用户类型">
                        {getFieldDecorator('userType', {
                            initialValue: 1,
                            rules: [ {
                                required: true, message: '请选择用户类型！',
                            }],
                        })(
                            <RadioGroup onChange={this.radioChange} >
                                <Radio value={1}>采购商</Radio>
                                <Radio value={2}>供应商</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="用户名">
                        {getFieldDecorator('userName ', {
                            rules: [ {
                                required: true, message: '用户名不能为空！',
                            }, {
                                validator: this.validUserName,
                            }],
                            validateTrigger: 'onBlur'
                        })(
                            <div>
                                <Input />
                                {this.state.validUserName ? <p>账号由字母开头，6-20位字母与数字组成，注册之后不能修改</p> : null}
                            </div>
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem{...formItemLayout} label="国家">
                        {getFieldDecorator('country', {
                            initialValue: '中国',
                            rules: [ {
                                required: true, message: '请选择国家',
                            }],
                        })(
                            <Select
                                showSearch
                                placeholder="选择国家"
                                optionFilterProp="children"
                                onChange={this.selectChange}
                                onFocus={this.selectFocus}
                                onBlur={this.selectBlur}
                                notFoundContent="没有找到对应国家"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.countryData.map((coun,i) => {
                                    return <Option value={coun.id} key={i}>{coun.nameCh}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' },
                                {
                                    validator: this.validatePhone,
                                }],
                            validateTrigger: 'onBlur'
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="验证码" extra="We must make sure that your are a human.">
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={8}>
                                {this.state.canSend ? <div className="sendCode-btn" onClick={this.sendCapt}>
                                    <span>{this.state.sendText}</span>
                                </div> : <div className="nosendCode-btn">
                                    <span>{this.state.count}s后重新发送</span>
                                </div>
                                }

                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem{...formItemLayout} label="Password">
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                            validateTrigger: 'onBlur'
                        })(
                            <div>
                                <Input onFocus={this.passChange} type="password" />
                                {this.state.validPassTip ? <p>6-20位密码，只能使用数字、字母、英文标点符号,数字、字母及英文标点必须包含两种，不能与用户名相同</p> : null}
                            </div>

                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="Confirm Password">
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </FormItem>
                </Form>
            </div>

        );
    }
}
const RegistrationForm = Form.create()(Register);
export default RegistrationForm;
