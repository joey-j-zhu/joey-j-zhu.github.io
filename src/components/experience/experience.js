import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from "react"
import '../../index.css';
import '../../App.css';
import logo from '../../logo.svg';


import './experience-entry';
import ExperienceEntry from './experience-entry';
import ExperienceList from './experience-list';
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

function Experience() {
  return (
      <ExperienceList />
  );
}

export default Experience;