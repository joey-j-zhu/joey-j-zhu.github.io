import React, { useEffect, useState } from 'react';
import '../../index.css';

import {default as HobbyButton} from './hobby-button';

function Hobbies() {
    return (
        <div>
            <div className="hobbies-menu">
                <HobbyButton label = "GRAPHIC DESIGN" index = {0} />
                <HobbyButton label = "VISUAL ART" index = {1} />
                <HobbyButton label = "PIANO SOLOIST" index = {2} />
                <HobbyButton label = "ENSEMBLE CELLIST" index = {3} />
            </div>
            
            <div className="hobbies">
                <div className="statement-box" style={{float:"left"}}>
                    <h3>___</h3>
                    <h3>bing chilling</h3>
                </div>
                <div className="hobbySlideshow" style={{float:"right"}}></div>
            </div>
        </div>
    );
}

export default Hobbies;