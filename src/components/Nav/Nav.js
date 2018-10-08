/**
 * Created by Administrator on 2018/4/12.
 */
import React from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import "./navcss.css"


const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup


export default class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current : 'mail'
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render(){
    return(
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}  style={{ width: 256 }} mode="vertical">
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>产品管理</span></span>} >
              <MenuItemGroup title="Item 1">
                  <Menu.Item key="1" >
                      <Link to="/ProductList">
                        <Icon type="mail" />
                        产品管理
                        </Link>
                  </Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Iteom2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
              </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>购物车</span></span>}>
            <Menu.Item key="5"><Link to="/Shopping"><Icon type="mail" />购物车</Link></Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="子菜单">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="home" /><span>登录</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
            <SubMenu key="sub5" title={<span><Icon type="smile" /><span>列表</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" title={<span><Icon type="cloud" /><span>详情页详情</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
            </SubMenu>
        </Menu>

    )
  }
}
