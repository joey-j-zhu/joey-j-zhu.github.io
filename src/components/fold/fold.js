import React, { useEffect, useState } from 'react';
import '../../index.css';
import DynamicText from './dynamic-text';
import { THEME_GRAY_6H } from '../../utils/colors';

import FoldCanvas from './fold-canvas';

function Fold() {
    return (
        <div class="fold-background">
            <div class="container">
                <div class="fold-background">
                    <FoldCanvas height={600} width={1300}/>
                </div>
                <div className="fold-overlay">
                    <img src="assets/about_me/background.jpg" alt="lmao u suck" width="1500px"/>
                </div>
                <div class="box overlay">
                    <div style={{float:"left", display:"flex"}}>
                        <img src="assets/cover-picture-cropped.jpg" style={{
                            float:"left",
                            height: "600px",
                            overflow: "hidden",
                        }}></img>
                        <div className="fold-title" style={{
                            float:"right",
                            maxWidth: "550px",
                            }}>
                            <h1>Hey, I'm Joey.</h1>
                            <DynamicText
                            subtitle="Software engineer and aspiring multimedia artist from the Bay Area"
                            baseStyle={{fontFamily:"Nunito Regular",
                                        fontSize: "24px",
                                        color: THEME_GRAY_6H.getHex()}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Fold;