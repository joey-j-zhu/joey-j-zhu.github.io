import React, { useState, useEffect } from "react";
import { THEME_GRAY_6B } from "../../utils/colors";

const HobbySlideshowImage = ({
    imageLink,
    renderParam,
    zIndex,
}) => {
    
const [opacity, setOpacity] = useState(0.9);

    var dimension = Math.max(0, 500 * (1 - renderParam * renderParam / 4));
    var yPosition = 400 * Math.sin(renderParam * Math.PI / 4);

    return (
        <div style={{
            height: dimension,
            width: dimension,
            zIndex: zIndex,
            position: "relative",
            margin: "auto",
            bottom: yPosition + 150,
            backgroundColor: THEME_GRAY_6B.getHex(),
            filter: "drop-shadow(10px 10px 10px #202026)",
        }}>
            <img src={imageLink} 
            onMouseEnter={() => {setOpacity(1);}}
            onMouseLeave={() => {setOpacity(0.9);}}
            style={{
                height: dimension,
                width: dimension,
                aspectRatio: "1 / 1",
                opacity: opacity * (1 - renderParam * renderParam / 4),
            }}></img>
        </div>
    );
};

export default HobbySlideshowImage;