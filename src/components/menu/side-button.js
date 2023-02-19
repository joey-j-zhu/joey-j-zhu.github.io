import React, { useEffect, useState } from 'react';
import '../../index.css';
import { THEME_GRAY_6H, WHITE, interpolateColor, themeTransientCycle, THEME_GREEN } from '../../utils/colors';
import { interpolateTrig } from '../../utils/functions';


const SideButton = (props) => {

    const incrementSize = 0.05;
    const tickLength = 10;

    const [isHovering, setIsHovering] = useState(false);
    const [hoverParam, setHoverParam] = useState(0);
    const [transient, setTransient] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTransient(transient > 0 ? transient - incrementSize : 0);
            setHoverParam(isHovering ? (hoverParam < 1 ? hoverParam + incrementSize : 1) 
                : (hoverParam > 0 ? hoverParam - incrementSize : 0));
        }, tickLength);
        return () => clearInterval(interval);
    }, [hoverParam, setHoverParam, transient, setTransient, isHovering, setIsHovering]);

    const navigate = () => {
        setTransient(1);
        console.log("clicked");
        window.location.href = props.navigation;
    };

    const renderColor = interpolateColor(THEME_GRAY_6H, THEME_GREEN, hoverParam, interpolateTrig);
    // Rendering
    return (
        <div className="menu-side-button" 
        onClick={() => navigate()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
            <div style={{
                    color: (transient > 0 ?
                        themeTransientCycle(WHITE, renderColor, 1 - transient, interpolateTrig).getHex()
                        :
                        renderColor.getHex())
                }}>
                {props.children}
            </div>
        </div>
    );
}

export default SideButton;