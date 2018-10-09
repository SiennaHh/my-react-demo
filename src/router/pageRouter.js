import React, { Component } from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';


import Nav from './../components/Nav/Nav'
import ProductList from './../page/ProductList/ProductList'
import Shopping from './../page/Shopping/Shopping'

import Detail from './../page/Detail/Detail'
import AddProduct from './../page/ProductList/addProduct'
import EditProduct from './../page/ProductList/editProduct'



const pageRouter = () => (
    <div className="page-main">
        <div className="app-nav">
            <Nav/>
        </div>
        <div className="main-content">
            <Switch>
                <Route path="/" exact component={ProductList}/>
                <Route path="/ProductList"  component={ProductList}/>
                <Route path="/Shopping"  component={Shopping}/>
                <Route path="/Detail"  component={Detail}/>
                <Route path="/AddProduct"  component={AddProduct}/>
                <Route path="/EditProduct/:id"  component={EditProduct}/>
                <Route render={() => <Redirect to="/"/>} />
            </Switch>
        </div>
    </div>
)
export default pageRouter;