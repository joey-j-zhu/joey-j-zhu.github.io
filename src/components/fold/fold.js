import React, { useEffect, useState } from 'react';
import '../../index.css';

import FoldCanvas from './fold-canvas';

function Fold() {
    return (
        <div>
            <FoldCanvas />

            <div className="fold-section">
                <div style={{float:"left"}}>
                    <img src="assets/cover-picture.jpg" height="500px"></img>
                </div>
                <div className="fold-title" style={{float:"left"}}>
                    <h1>Hey, I'm Joey.</h1>
                    <h3>Software engineer and aspiring multimedia artist from the Bay Area</h3>
                </div>
            </div>
        </div>
        
    );
}

export default Fold;