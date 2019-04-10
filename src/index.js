import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import AppStore from './redux/appStore'


ReactDOM.render(
    <Router>
        <Provider store={AppStore}>
            <App />
        </Provider>
    </Router>, 
    document.getElementById('root'));

serviceWorker.unregister();
