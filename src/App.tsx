import React from 'react';
import Register from "./Register/Register";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";


function App() {
    return (
        <div>
            <header>
                <Router>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/registerb' component={Register}/>
                        </Switch>
                    </div>
                </Router>
            </header>
        </div>
    );
}

export default App;
