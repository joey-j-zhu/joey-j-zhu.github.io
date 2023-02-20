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
                    label = "JOEY ZHU"
                    navigation = {0}
                    fontFamily = "Nunito ExtraBold"
                />
            </div>
            
            <div style={{
                display: "flex",
                float:"right",
                marginRight: "50px",
                }}>
                    <CenterButton
                    label = "contacts"
                    navigation = {4000}
                />
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
                    navigation = {700}
                />
                <CenterButton
                    label = "work"
                    navigation = {1300}
                />
                <CenterButton
                    label = "gallery"
                    navigation = {2750}
                />
                
            </div>
        </div>
    );
}

export default Menu;