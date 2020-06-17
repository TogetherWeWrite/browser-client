import React from 'react';
import Register from "./Account/Register";
import Login from "./Account/Login";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import {Provider} from "react-redux";
import store from "./store";
import Overview from "./WorldOverview/Home";
import WorldDetails from "./WorldOverview/DetailPage"
import BrowseWorlds from "./WorldOverview/BrowseWorlds";
import World from "./WorldView/World";
import StoryManage from "./Story/StoryManage";


function App() {
    return (
        <div>
            <Provider store={store} >
                <Router>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/' component={Overview}/>
                            <Route path='/world/details/:worldid' component={WorldDetails}/>
                            <Route path='/world/story/:id' component={StoryManage}/>
                            <Route path='/world/:id' component={World}/>
                            <Route exact path='/browseworlds' component={BrowseWorlds}/>
                            <Route exact path='/home' component={Home}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
