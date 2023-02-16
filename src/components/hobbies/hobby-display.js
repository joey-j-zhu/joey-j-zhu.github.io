import React, { useState, useEffect } from 'react';
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, } from "../../utils/colors";

import { default as HobbySlideshow } from "./hobby-slideshow";
import { default as HobbyStatement } from "./hobby-slideshow";


const HobbyDisplay = ({
    selectedIndex,
    contents,
}) => {

    // Idle loop to update transition states
    const [renderOffset, setRenderOffset] = useState(0);
    const [renderIndex, setRenderIndex] = useState(0);
    const [scrollMode, setScrollMode] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(1);
    const scrollIncrement = 0.05;

    useEffect(() => {
        const interval = setInterval(() => {
            if (renderOffset <= 0) {
                if (scrollMode == -1) {
                    setRenderOffset(1);
                    setScrollMode(1);
                    setRenderIndex(selectedIndex);
                    console.log("scroll mode changed");
                } else {
                    setRenderOffset(0);
                }
            } else {
                setRenderOffset(renderOffset - scrollIncrement);
            }
        }, 10);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        setRenderOffset(1);
        setScrollMode(-1);
        setScrollDirection(selectedIndex > renderIndex ? 1 : -1)
        console.log("index changed");
    }, [selectedIndex]);
    
    var xOffset = 0;
    if (scrollMode == -1) {
        xOffset = (1 - renderOffset) * 1000 * scrollDirection;
    } else if (scrollMode == 1) {
        xOffset = (renderOffset) * -1000 * scrollDirection;
    }

    if (contents != undefined) {
        console.log(renderOffset);
        return (
            <div style={{position: "relative", left: xOffset,}}>
                <HobbyStatement description="bing chilling" />
                <HobbySlideshow 
                imageLinks={contents[renderIndex]}
                renderParams={{renderOffset: renderOffset, scrollMode: scrollMode}}/>
            </div>
        );
    } else {
        return (
            <div>{renderIndex}</div>
        );
    }
    
}

export default HobbyDisplay;