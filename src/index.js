import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import RootReducer from './reducers/RootReducer';
import './index.css';
import App from './components/App';

const store = createStore(
    RootReducer,
    applyMiddleware(
        thunkMiddleware,
        logger,
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'),
);

registerServiceWorker();
