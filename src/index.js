import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import customTheme from './utils/theme';
import AuthContext from './components/context/LoginContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <AuthContext>
        <Router>
          <App />
        </Router>
      </AuthContext>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
