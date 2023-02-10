import React, { useEffect, useState } from 'react';
import '../../index.css';

function Hobbies() {
    return (
        <div>
            <div className="hobbies-menu">
            <div className="center-options">
                <button>
                    Graphic Design
                </button>
                <button>
                    Visual Art
                </button>
                <button>
                    Piano Soloist
                </button>
                <button>
                    Ensemble Cellist
                </button>
            </div>
            
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