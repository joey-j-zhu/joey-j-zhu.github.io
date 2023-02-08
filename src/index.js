import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import './mapping';


import App from './App';
import { default as ExperienceEntry } from './components/experience/experience-entry';
import { default as ExperienceList } from './components/experience/experience-list';
import { default as Experience } from './components/experience/experience';


import reportWebVitals from './reportWebVitals';
import { parseJsonProps, getComponentById, registerComponent } from './mapping';
//import navButton from './components/nav-button';
//import hobbySlideshow from './components/hobby-slideshow';
//import hobbyButton from './components/hobby-button';



const experienceList = new ExperienceList([
  new ExperienceEntry(
    "Berkeley, CA",
    "AUG 2019 - DEC 2022",
    "University of California, Berkeley",
    "B.A. Computer Science, Physics Concentration",
    "description here",
  ), 
  new ExperienceEntry(
    "Seattle, WA",
    "JAN 2022 - MAY 2022",
    "Amazon",
    "Software Engineer Intern",
    "description here",
  ), 
  new ExperienceEntry(
    "Redwood City, CA",
    "MAY 2022 - AUG 2022",
    "NimbleRx",
    "Software Engineer Intern",
    "description here",
  ), 
  new ExperienceEntry(
    "Berkeley, CA",
    "AUG 2022 - NOV 2022",
    "Lawrence Berkeley National Laboratory",
    "Software Engineer and Research Intern",
    "description here",
  ),
]);


registerComponent("experience", Experience);
//registerComponent("experience-list", ExperienceList);


const roots = document.querySelectorAll('[data-react-component]');

roots.forEach(root => {

  const componentId = root.dataset.reactComponent;
  const componentJsonProps = root.dataset.reactProps;

  console.log("componentId: " + componentId);
  console.log("componentJsonProps: " + componentJsonProps);

  const Component = getComponentById(componentId);

  console.log("component: " + Component);

  const props = parseJsonProps(componentJsonProps);
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
