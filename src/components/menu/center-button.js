import React, { useEffect, useState } from 'react';
import '../../index.css';
import { THEME_GRAY_6H, WHITE, interpolateColor, themeTransientCycle } from '../../utils/colors';
import { interpolateTrig } from '../../utils/functions';

import { parseJsonProps, getComponentById, registerComponent } from '../../utils/mapping';

const CenterButton = ({
    label,
    navigation,
}) => {

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
        window.scrollTo({
            top: navigation,
            behavior: "smooth",
        });
    };

    const renderColor = interpolateColor(THEME_GRAY_6H, WHITE, hoverParam, interpolateTrig);
// Rendering
    return (
        <div className="menu-button" 
        onClick={() => navigate()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>

            <div style={{
                color: (transient > 0 ?
                    themeTransientCycle(WHITE, renderColor, 1 - transient, interpolateTrig).getHex()
                    :
                    renderColor.getHex())
                }}>
                {label}
            </div>
        </div>
    );
}

export default CenterButton;