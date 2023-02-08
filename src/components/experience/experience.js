import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from "react"
import '../../index.css';
import '../../App.css';
import logo from '../../logo.svg';


import './experience-entry';
import ExperienceEntry from './experience-entry';
import ExperienceList from './experience-list';
import ExperienceDisplay from './experience-display';
import App from '../../App';


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

function Experience({ entryList }) {
  return (
    <div className="experience-section">
        <div className="statement-box" style={{float:"left"}}>
            <h3>___</h3>
            <h3>I love learning and experiencing processes where innovative ideas give rise to impactful products that truly benefit users. </h3>
        </div>

        <div style={{float:"right"}}>
          <ExperienceList />   
        </div>
        
        <div className="skill-box" style={{float:"left"}}>
          <ExperienceDisplay 
            parentList={<ExperienceList />}
          />   
        </div>
    </div>
       
  );
}

export default Experience;