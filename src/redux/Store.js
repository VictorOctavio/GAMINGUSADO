import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import appReducers from './appDuck'
import userReducer, {ReadSesionAction} from './userDuck'
import adminReducer from './adminDucks'
import administradorReducer from './administradorDuck'

const rootReducers = combineReducers({
    app: appReducers,
    user: userReducer,
    admin: adminReducer,
    administrador: administradorReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
    ReadSesionAction()(store.dispatch)
    return store
}