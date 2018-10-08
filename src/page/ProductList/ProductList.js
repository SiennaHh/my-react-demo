/**
 * Created by Administrator on 2018/4/12.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Table,Divider,Button } from 'antd'
import axios from 'axios';
import "./productList.css"
// import EditProduct from "./editProduct"
class ProductList extends Component {
  constructor(){
    super()
    this.state = {
      // data:[
      //   {id: 1, productName: "产品1", time: "刚上架"},
      //   {id: 2, productName: "产品2", time: "三天前上架"},
      //   {id: 3, productName: "产品3", time: "昨天上架"}],
      goodsList: [],
    }
    this.columns = [{
        title: '商品编号',
        dataIndex: 'goodsSn',
        key: 'goodsSn',
    },{
        title: '产品名字',
        dataIndex: 'goodsName',
        render: (text,record) => (
            <span>
                <img className="goodsImg" src={record.goodsThumb} alt=""/>
                <span>
                    {record.goodsName}
                </span>
            </span>
        )
    },{
        title: '最高价格',
        dataIndex: 'maxPrice',
        key: 'maxPrice',
    },{
        title: '操作',
        key: 'handle',
        render: (text,record) => (
            <span>
                {/*<Link to={{pathname:'/EditProduct',query:{id:record.id}}}>*/}
                <Link to={'/EditProduct/'+record.id}>
                    编辑
                </Link>
               <Divider type="vertical"/>
               <a href="">删除</a>
            </span>
        )
    }]
  }
  componentDidMount(){
      axios.get(`http://api.ca-b2b.cn/ca-goods-provider/source-open/getPopularGoods`)
          .then(res => {
              const goodList = res.data.data
              this.setState({goodList: goodList});
              console.log(this.state.goodList)
          }
      )
  }
  render() {
    console.log(this.state.goodsList)
    return (
        <div className="product-list-main">
            <div className="add-btn">
                <Button type="primary"><Link to="/AddProduct">添加产品</Link></Button>
            </div>
            <Table className="table" columns={this.columns} dataSource={this.state.goodList} />
        </div>
    );
  }
}
export default ProductList;