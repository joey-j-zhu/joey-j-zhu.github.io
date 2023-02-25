import React from 'react';
import '../../index.css';

import { default as CenterButton } from './center-button';
import { default as SideButton } from './side-button';

function Menu() {
    return (
        <div className="menu-section">

            <div className="menu-overlay"><img src="assets/about_me/background.jpg" width="2000px"/></div>
            <div className="menu-overlay"><img src="assets/about_me/background.jpg" width="2000px"/></div>

            <div className="menu-left-container">
                <CenterButton fontFamily = "Nunito ExtraBold" navigationPosition = {0}>
                    {"JOEY ZHU"}
                </CenterButton>
            </div>
            
            <div className="menu-right-container">
                <CenterButton fontFamily = "Nunito Bold"
                navigationPosition = {4000}>
                    {"contacts"}
                </CenterButton>

                <SideButton navigation = "mailto:joey.j.zhu@gmail.com">
                    <i class="fa fa-envelope" fontSize="24px"></i>
                </SideButton>

                <SideButton navigation = "https://www.linkedin.com/in/joey-j-zhu">
                    <i class="fa fa-linkedin-square" fontSize="24px"></i>
                </SideButton>

                <SideButton navigation = "https://github.com/np-eazy">
                    <i class="fa fa-github" fontSize="24px"></i>
                </SideButton>
            </div>

            <div className="menu-middle-container">
                <CenterButton fontFamily = "Nunito Bold" navigationPosition = {700}>
                    {"about"}
                </CenterButton>

                <CenterButton fontFamily = "Nunito Bold" navigationPosition = {1300}>
                    {"work"}
                </CenterButton>
                
                <CenterButton fontFamily = "Nunito Bold"navigationPosition = {2750}>
                    {"gallery"}
                </CenterButton>
            </div>
        </div>
    );
}

export default Menu;