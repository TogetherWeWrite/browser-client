import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './Home/App';
import Something from './TestComponenets/Test';
import * as serviceWorker from './serviceWorker';
import Navbar from './Navigation/navigationbar';
import 'bootstrap'

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Something name="stijn" />, document.getElementById('side'));
ReactDOM.render(<Navbar />, document.getElementById('navigationbar'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
