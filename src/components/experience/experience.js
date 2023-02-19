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
        }}>
          <div className="statement-box">
              ___
              <br></br>
              <br></br>
              {"I love learning and experiencing processes where innovative ideas give rise to impactful products that truly benefit users."}
          </div>
        </StatementDisplay>
      </div>

      <div style={{
        marginTop: "300px",
        minHeight: "0px",
        float: "left",
      }}>
      </div>
      
      <div style={{
        float:"right",
        }}>
        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {0}
        contents = {{
          location: "Berkeley, CA",
          date: "AUG 2019 - DEC 2022",
          company: "University of California, Berkeley",
          title: "B.A. Computer Science, Physics Minor",
        }}>
          <div>
            <p>
              <a href="https://github.com/np-eazy/fa22-cs182-proj">
                <i class="fa fa-external-link" aria-hidden="true"></i>
                {" CS 182 Project: Quantum Solver Neural Network"}
              </a>
            </p>
            <p>Computer Science: </p>
          </div>
        </ExperienceEntry>

        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {1}
        contents = {{
          location: "Seattle, WA",
          date: "JAN 2022 - MAY 2022",
          company: "Amazon",
          title: "Fullstack Software Engineer (Intern)",
        }}>
          <div>
            <p>
              <a href="https://www.amazon.jobs/en/job_categories/legal">
                <i class="fa fa-external-link" aria-hidden="true"></i>
                {" About Amazon Legal"}
              </a>
            </p>
            <p>
              <a href="https://docs.google.com/presentation/d/15Std3z7t5vRNOcDTAjejsS1LZsHvqzqC/edit#slide=id.g1e023731a5e_0_77">
                <i class="fa fa-external-link" aria-hidden="true"></i>
                {" Access Request Form Presentation"}
              </a>
            </p>
          </div>
        </ExperienceEntry>

        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {2}
        contents = {{
          location: "Redwood City, CA",
          date: "MAY 2022 - AUG 2022",
          company: "NimbleRx Pharmacy",
          title: "Backend Software Engineer (Intern)",
        }}>
          <div>
            <p>
              <a href="https://www.nimblerx.com/about">
                <i class="fa fa-external-link" aria-hidden="true"></i>
                {" About NimbleRx"}
              </a>
            </p>
          </div>
        </ExperienceEntry>

        <ExperienceEntry 
        selectedIndex = {index}
        selectIndex = {setIndex}
        thisIndex = {3}
        contents = {{
          location: "Berkeley, CA",
          date: "AUG 2019 - DEC 2022",
          company: "Lawrence Berkeley Ntl. Lab",
          title: "Software Engineer and Researcher (Intern)",
        }}>
          <div>
            <p>
              <a href="https://github.com/ECP-WarpX/impactx/issues/104#issuecomment-1275922946">
                <i class="fa fa-external-link" aria-hidden="true"></i>

                {" About ImpactX"}
              </a>
            </p>
            <p>
              <a href="https://github.com/ECP-WarpX/impactx/issues/104#issuecomment-1275922946">
                <i class="fa fa-external-link" aria-hidden="true"></i>

                {" MadX Parser Design Notes"}
              </a>
            </p>
          </div>
        </ExperienceEntry>
      </div>

      <div style={{float:"left"}}>
        <ExperienceDisplay 
        selectedIndex = {index}
        contents={{
          skillSections: {
            "Frontend Languages": { 
              "React.js": [1],
              "Javascript": [0, 1],
              "Typescript": [1],
              "HTML": [1],
              "CSS": [1],
            },

            "Backend Languages": {
              "AWS DynamoDB": [1],
              "AWS SQS": [1, 2],
              "AWS S3": [1, 2],
              "Spring Boot": [2],
            },
            
            "Development Tools": {
              "CI/CD Development": [1, 2],
              "Git, Github": [0, 1, 2, 3],
              "AWS Cloudwatch": [1, 2],
              "Jenkins": [2],
              "Adobe Photoshop": [0],
              "Adobe Illustrator": [1],
            },

            "Software Practices": {
              "SDLC": [1, 2, 3],
              "Agile Development": [1],
              "Business Software": [1, 2, 3],
              "Customer Software": [2, 3],
              "Physics Simulations": [3],
              "Quantitative Analysis": [0, 3],
            },

            "Backend Languages": {
              "Java (8)": [0, 1, 2],
              "Python (3)": [0, 3],
              "C++ (17)": [0, 3],
              "Golang": [0],
              "OpenMP": [0, 3],
              "ExecutorService": [2],
            },

            "Computer Science Subjects": {
              "Machine Learning": [0],
              "Deep Neural Networks": [0],
              "Cybersecurity": [0],
              "Algorithm Theory": [0],
            },

            "Physics Subjects": {
              "Probabilistic Modeling": [0],
              "Statistical Mechanics": [0],
              "Analytical Mechanics": [0],
              "Plasma Dynamics": [0, 3],
            },
          }
        }}/>
      </div>
    </div>
  );
}

export default Experience;