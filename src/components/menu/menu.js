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

            <div style={{
                display: "flex",
                marginLeft: "50px",
                float:"left",
                }}>
                <CenterButton //TODO: change to home button
                    label = "Joey Zhu"
                    navigation = {0}
                />
            </div>
            
            <div style={{
                display: "flex",
                float:"right",
                marginRight: "50px",
                }}>
                <SideButton
                    label = "Email"
                    navigation = "mailto:joey.j.zhu@gmail.com">
                    <i class="fa fa-envelope" fontSize="24px"></i>
                </SideButton>
                <SideButton
                    label = "Linkedin"
                    navigation = "https://www.linkedin.com/in/joey-j-zhu">
                    <i class="fa fa-linkedin-square" fontSize="24px"></i>
                </SideButton>
                <SideButton
                    label = "Github"
                    navigation = "https://github.com/np-eazy">
                    <i class="fa fa-github" fontSize="24px"></i>
                </SideButton>
            </div>

            <div className="center-options">
                <CenterButton
                    label = "about"
                    navigation = {900}
                />
                <CenterButton
                    label = "skills"
                    navigation = {1350}
                />
                <CenterButton
                    label = "services"
                    navigation = {2500}
                />
            </div>
        </div>
    );
}

export default Menu;