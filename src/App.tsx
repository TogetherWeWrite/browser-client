import React from 'react';
import Register from "./Account/Register";
import Login from "./Account/Login";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import {Provider} from "react-redux";
import store from "./store";
import Overview from "./World/Home";
import WorldDetails from "./World/DetailPage"


function App() {
    return (
        <div>
            <Provider store={store} >
                <Router>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/world' component={Overview}/>
                            <Route path='/world/details/:worldid' component={WorldDetails}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
