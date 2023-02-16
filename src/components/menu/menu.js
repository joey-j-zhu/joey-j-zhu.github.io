import React, { useEffect, useState } from 'react';
import '../../index.css';

import { default as CenterButton } from './center-button';
import { default as SideButton } from './side-button';

function Menu() {
    return (
        <div className="menu-section">
            <div className="menu-overlay">
                <img src="assets/about_me/background.jpg" alt="lmao u suck" width="2000px"/>
            </div>
            <div className="menu-overlay">
                <img src="assets/about_me/background.jpg" alt="lmao u suck" width="2000px"/>
            </div>
            <div style={{float:"left"}}>
                <CenterButton //TODO: change to home button
                    label = "Joey Zhu"
                    navigation = {0}
                />
            </div>
            
            <div style={{
                minWidth:"500px",
                display: "flex",
                float:"right",
                }}>
                <SideButton
                    label = "Email"
                    navigation = "mailto:joey.j.zhu@gmail.com"
                />
                <SideButton
                    label = "Linkedin"
                    navigation = "https://www.linkedin.com/in/joey-j-zhu"
                />
                <SideButton
                    label = "Github"
                    navigation = "https://github.com/np-eazy"
                />
            </div>

            <div className="center-options">
                <CenterButton
                    label = "About"
                    navigation = {900}
                />
                <CenterButton
                    label = "Skills"
                    navigation = {1350}
                />
                <CenterButton
                    label = "Services"
                    navigation = {2500}
                />
            </div>
        </div>
    );
}

export default Menu;