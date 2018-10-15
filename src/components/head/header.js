import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import "./header.css"

class Header extends Component {
    render() {
        return (
            <div className="head-er">
                <Row>
                    <Col span={18}>
                        <p className="title">Header</p>
                    </Col>

                    <Col span={6}>
                        <div className="login-block">
                            <span>

                            </span>
                            {/*<span>1</span>*/}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Header;
