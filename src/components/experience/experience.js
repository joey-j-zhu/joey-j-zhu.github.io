import React, { useEffect, useState } from 'react';
import '../../index.css';

import { default as ExperienceEntry } from './experience-entry';
import StatementDisplay from './statement-display';
import ExperienceDisplay from './experience-display';


function Experience() {

  // Idle loop to update transition states
  let transientIncrement = 0.02;
  const [transient, setTransient] = useState(0);

  // Selection Logic
  const [index, setIndex] = useState(-1);

  // Rendering
  return (
    <div className="experience-section">
      <div style={{float:"left"}}>
        <StatementDisplay props = {{
          statement: "lorem ipsum",
        }}/>
      </div>
      
      <div style={{float:"right"}}>
        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {0}
        contents = {{
          location: "Berkeley, CA",
          date: "AUG 2019 - DEC 2022",
          company: "University of California, Berkeley",
          title: "B.A. Computer Science, Physics Minor",
          description: "description here",
        }}/>
        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {1}
        contents = {{
          location: "Seattle, WA",
          date: "JAN 2022 - MAY 2022",
          company: "Amazon",
          title: "Fullstack Software Engineer (Intern)",
          description: "description here",
        }}/>
        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {2}
        contents = {{
          location: "Redwood City, CA",
          date: "MAY 2022 - AUG 2022",
          company: "NimbleRx Pharmacy",
          title: "Backend Software Engineer (Intern)",
          description: "description here",
        }}/>
        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {3}
        contents = {{
          location: "Berkeley, CA",
          date: "AUG 2019 - DEC 2022",
          company: "Lawrence Berkeley Ntl. Lab",
          title: "Software Engineer and Researcher (Intern)",
          description: "description here",
        }}/>
      </div>

      <div style={{float:"left"}}>
        <ExperienceDisplay 
        selectedIndex = {index}
        contents={{
          skills: [
            {
              "Python": [0, 3],
              "Java": [0, 1, 2],
            },
            {
              "SDLC": [1],
              "CI/CD": [1, 2],
            }
          ]
        }}/>
      </div>
    </div>
  );
}

export default Experience;