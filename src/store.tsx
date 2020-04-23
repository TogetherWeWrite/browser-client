import { createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import {default as authentication} from './reducers/authenticationReducer';



export default createStore(combineReducers({
        authentication
    }),
    {},
    applyMiddleware(createLogger(), thunk)
);