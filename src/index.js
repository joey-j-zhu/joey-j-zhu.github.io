import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';

import './index.css';
import './components/experience/experience.css';

import './mapping';


import { default as Experience } from './components/experience/experience';


import reportWebVitals from './reportWebVitals';
import { parseJsonProps, getComponentById, registerComponent } from './mapping';

registerComponent("experience", Experience);


const roots = document.querySelectorAll('[data-react-component]');

roots.forEach(root => {

  const componentId = root.dataset.reactComponent;
  const componentJsonProps = root.dataset.reactProps;
  const Component = getComponentById(componentId);

  const temp = createRoot(root);

  temp.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
})


function tick() {

  
}



setInterval(tick, 30);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
