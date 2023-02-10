import React, { useEffect, useState } from 'react';
import '../../index.css';

function Menu() {
    return (
        <div className="menu-section">
            <div style={{float:"left"}}>
                <button>
                    JOEY ZHU
                </button>
            </div>
            
            <div style={{float:"right"}}>
                <button>
                    Email
                </button>
                <button>
                    LinkedIn
                </button>
                <button>
                    Github
                </button>
            </div>

            <div className="center-options">
                <button>
                    About
                </button>
                <button>
                    Skills
                </button>
                <button>
                    Contact
                </button>
            </div>
        </div>
    );
}

export default Menu;