import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from "react"
import '../index.css';
import '../App.css';


import './experience/experience-entry';
import { ExperienceEntry } from './experience/experience-entry';
import { ExperienceList } from './experience/experience-list';

const experienceEntryBerkeley = new ExperienceEntry(
  "Berkeley, CA",
  "AUG 2019 - DEC 2022",
  "University of California, Berkeley",
  "B.A. Computer Science, Physics Concentration",
  "description here",
);

const experienceEntryAmazon = new ExperienceEntry(
  "Seattle, WA",
  "JAN 2022 - MAY 2022",
  "Amazon",
  "Software Engineer Intern",
  "description here",
);

const experienceEntryNimbleRx = new ExperienceEntry(
  "Redwood City, CA",
  "MAY 2022 - AUG 2022",
  "NimbleRx",
  "Software Engineer Intern",
  "description here",
);

const experienceEntryLBNL = new ExperienceEntry(
  "Berkeley, CA",
  "AUG 2022 - NOV 2022",
  "Lawrence Berkeley National Laboratory",
  "Software Engineer and Research Intern",
  "description here",
);

const experienceList = new ExperienceList([
  experienceEntryBerkeley, 
  experienceEntryAmazon, 
  experienceEntryNimbleRx, 
  experienceEntryLBNL,
]);


function Experience() {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--logo-color');
  console.log(color);

  return (
    <div className="Experience">
      <div className="experience-box" onClick={experienceEntryBerkeley.select.bind(experienceEntryBerkeley)}>
        Berkeley
      </div>
      <div className="experience-box" onClick={experienceEntryAmazon.select.bind(experienceEntryAmazon)}>
        Amazon
      </div>
      <div className="experience-box" onClick={experienceEntryNimbleRx.select.bind(experienceEntryNimbleRx)}>
        NimbleRx
      </div>
      <div className="experience-box" onClick={experienceEntryLBNL.select.bind(experienceEntryLBNL)}>
        LBNL
      </div>
    </div>
  );
}

const experience = ReactDOM.createRoot(document.getElementById('experience'));

experience.render(
  <React.StrictMode>
    <Experience/>
  </React.StrictMode>
);

function tick() {
  experienceList.idle();
}

setInterval(tick, 30);