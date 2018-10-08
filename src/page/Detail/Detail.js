/**
 * Created by Administrator on 2018/4/12.
 */
import React, { Component } from 'react';
class Detail extends Component {
  render() {
    console.log(this.props.location.query.id)
    return (
        <div>
          <h1>Detail页面</h1>
          <h2>这是{this.props.location.query.id}号商品</h2>
          <h2>这是{this.props.location.query.name}商品</h2>
        </div>
    );
  }
}
export default Detail;