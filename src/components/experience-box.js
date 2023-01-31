import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../../public/styles.css';
import App from './App';

const experienceBox = ReactDOM.createRoot(document.getElementById('experienceBox'));
experienceBox.render(
  <React.StrictMode>
    <div class="experience-box">
        testing
    </div>
    <App />
  </React.StrictMode>
);
