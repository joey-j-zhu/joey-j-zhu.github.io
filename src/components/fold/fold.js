import React, { useEffect, useState } from 'react';
import '../../index.css';

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
                        <img src="assets/cover-picture.jpg" height="600px" style={{float:"left"}}></img>
                        <div className="fold-title" style={{float:"right"}}>
                            <h1>Hey, I'm Joey.</h1>
                            <h3>Software engineer and aspiring multimedia artist from the Bay Area</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Fold;