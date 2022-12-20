import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>
);
