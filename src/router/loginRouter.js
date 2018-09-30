import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import App from './../App';

import Login from './../page/Login/Login'

import RegistrationForm from './../page/Login/register'


const loginRouter = () => (
    <div>
        <Switch>
            <Route
                path="/"
                render={props => (
                    <App>
                        <Switch>
                            <Route path="/" exact component={Login}/>
                            <Route path="/Login"  component={Login}/>
                            <Route path="/register"  component={RegistrationForm}/>
                            <Route render={() => <Redirect to="/"/>} />
                        </Switch>
                    </App>
                )}
            />
        </Switch>
    </div>
)
export default loginRouter;