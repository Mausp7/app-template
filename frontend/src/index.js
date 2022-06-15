import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CounterProvider } from "./providers/counter";
import { AuthProvider } from "./providers/auth";

import {
  BrowserRouter
} from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CounterProvider>
  </AuthProvider>

);