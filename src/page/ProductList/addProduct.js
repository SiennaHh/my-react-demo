import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Radio ,Upload, Modal  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];
const roleData = [{
    id: 126,
    name: '产品专员',
    desc: [1.0, null, 2]
},{
    id: 127,
    name: '店铺专员',
    desc: ['店铺维护','原材料管理','信息管理']
},{
    id: 128,
    name: '活动专员',
    desc: ['原材料发布','原材料管理']
}]
const options = [
    { label: 'All', value: 'All' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];

class AddProduct extends Component{
    constructor(){
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            roleValue: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
    componentWillMount(){
        this.props.form.setFieldsValue({
            picture: this.state.fileList
        })
        // console.log(this.props.form.setFieldsValue);
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        const form = this.props.form;
        this.setState(
            { fileList }
            )

    }
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            roleValue: e.target.value,
        });
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
        console.log(!!value)
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    validateRole = (rule, value, callback) => {
        const form = this.props.form;
        console.log(value)
        console.log(!value)
        if(!value){
            callback('Please select the role!');
        }else {
            callback();
        }
    }
    // isUploadPicture = (rule, value, callback) => {
    //     value = this.state.fileList
    // }
    normalizeAll = (value, prevValue = []) => {
        console.log(prevValue)
        console.log(value)

        if (value.indexOf('All') >= 0 && prevValue.indexOf('All') < 0) {
            return ['All', 'Apple', 'Pear', 'Orange'];
        }
        if (value.indexOf('All') < 0 && prevValue.indexOf('All') >= 0) {
            return [];
        }
        console.log(prevValue.indexOf('All'));
        console.log(value.indexOf('All'));
        return value;

    };
    normalizePicture = (value, prevValue = []) => {
      return  this.state.fileList
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
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
                    span: 24,
                    offset: 4,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        let roleArrData = roleData.map(item => {
            const descData = item.desc.map(descper => {
                return(
                        <li key={descper}>{descper}</li>
                )
            });
            return(
                <div className="role-block" key={item.id}>
                    <Radio value={item.id}>{item.name}</Radio>
                    {/*<p></p>*/}
                    <ul className="role-ul" >
                        {descData}
                    </ul>
                </div>

            )
        });
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        return(
            <div>
                <div>56555</div>
                <div className="form-main">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('fruits', {
                                normalize: this.normalizeAll,
                            })(<CheckboxGroup options={options} />)}
                        </FormItem>
                        <FormItem{...formItemLayout} label="Role">
                            {getFieldDecorator('role', {
                                rules: [
                                    {required: true, message: 'Please select the role!',
                                    }, {
                                        validator: this.validateRole,
                                    }],
                            })(
                                <div>
                                    <RadioGroup onChange={this.onRadioChange} value={this.state.roleValue}>
                                        {roleArrData}
                                    </RadioGroup>
                                </div>

                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [{type: 'email', message: 'The input is not valid E-mail!',},
                                    {required: true, message: 'Please input your E-mail!',}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="Password">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
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
                        <FormItem{...formItemLayout} label="Picture">
                            {getFieldDecorator('picture',{
                                normalize: this.normalizePicture,
                            })(
                                <div className="clearfix">
                                    <Upload action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}>
                                        {fileList.length >= 3 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </FormItem>

                        <FormItem{...formItemLayout} label={(<span>Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip></span>)}>
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="Habitual Residence">
                            {getFieldDecorator('residence', {
                                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                            })(
                                <Cascader options={residences} />
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="Phone Number">
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="Website">
                            {getFieldDecorator('website', {
                                rules: [{ required: true, message: 'Please input website!' }],
                            })(
                                <AutoComplete dataSource={websiteOptions} onChange={this.handleWebsiteChange} placeholder="website">
                                    <Input />
                                </AutoComplete>
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout} label="Captcha" extra="We must make sure that your are a human.">
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                    })(
                                        <Input />
                                    )}
                                </Col>
                                <Col span={12}>
                                    <Button>Get captcha</Button>
                                </Col>
                            </Row>
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
            </div>
        )
    }
}
const addProductForm = Form.create()(AddProduct);

export default addProductForm;