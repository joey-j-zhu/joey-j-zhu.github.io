import React, { useEffect, useState } from 'react';
import '../../index.css';


function About() {
    return (
        <div className="about-section">
            <div className="about-section-overlay">
                <img src="assets/about_me/background.jpg" width="2000px"/>
            </div>
            <div className="about-section-overlay">
                <img src="assets/about_me/background.jpg" width="2000px"/>
            </div>
            <div style={{
                maxWidth: "1000px"
            }}>
                <h2>About Me</h2>
                <h2>___</h2>
                <br></br>
                <p>
                    I first got into programming and graphic design in middle school through making games in Python, JS, and Scratch, inspired by graphics of my favorite websites and games. Studying at UC Berkeley has helped me gain a deep technical foundation, and my experiences at both well-established and fast-growing companies helped me sharpen my talent into the professional skills to work with others to bring ideas to reality.
                </p>
                <br></br>
                <p>
                    Aside from my CS degree and software experience, I have gained many problem-solving tools and insights through studying physics. The thermodynamic gateway from microscopic to life-size theories has always interested me, and helped me further build my understanding of probability, statistics, and the universality of these concepts in almost every system today.
                </p>
            </div>
        </div>
    );
}

export default About;