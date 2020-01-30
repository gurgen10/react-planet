import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoiundary from './ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

ReactDOM.render(<ErrorBoiundary><App /></ErrorBoiundary>, document.getElementById('root'));
