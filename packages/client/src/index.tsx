import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const appRoot = document.getElementById('scrpr-root');

ReactDOM.render(<App />, appRoot);

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./App', () => {
            const ReloadedApp = require('./App').default;

            ReactDOM.render(<ReloadedApp />, appRoot);
        });
    }
}

serviceWorker.unregister();
