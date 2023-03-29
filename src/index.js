import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="630129650247-gkc9jouc4jgrg2sapdes4hucuc4jkp11.apps.googleusercontent.com">
  <React.StrictMode>
      <App />
  </React.StrictMode>
</GoogleOAuthProvider>,
);

reportWebVitals();