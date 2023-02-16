import React, { useState, useEffect } from 'react';

import {default as HobbySlideshowImage} from './hobby-slideshow-image';
const HobbySlideshow = ({
    imageLinks,
    renderParams,
}) => {
    // Idle loop to update transition states

    const [slideshowIndex, setSlideshowIndex] = useState(0);
    const [renderOffset, setRenderOffset] = useState(0);
    const [scrollMode, setScrollMode] = useState(0);
    const scrollIncrement = 0.05;
    
    const images = imageLinks != undefined ? Array.from(imageLinks).length : 0;
    
    const indexUp = () => {
        setSlideshowIndex((slideshowIndex + 1) % images);
        setScrollMode(1);
        setRenderOffset(-1);
    }
    const indexDown = () => {
        setSlideshowIndex((slideshowIndex - 1) % images);
        setScrollMode(-1);
        setRenderOffset(1);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (imageLinks != undefined) {
                if (scrollMode == 1) {
                    setRenderOffset(renderOffset >= 0 ? 0 : renderOffset + scrollIncrement);
                } else if (scrollMode == -1) {
                    setRenderOffset(renderOffset <= 0 ? 0 : renderOffset - scrollIncrement);
                } else {
                    setRenderOffset(0);
                }
            }
        }, 10);
        return () => clearInterval(interval);
    });

    if (imageLinks != undefined) {
        var prevPrevImage = imageLinks[(slideshowIndex - 2) % images];
        var prevImage = imageLinks[(slideshowIndex - 1) % images];
        var currImage = imageLinks[slideshowIndex];
        var nextImage = imageLinks[(slideshowIndex + 1) % images];
        var nextNextImage = imageLinks[(slideshowIndex + 2) % images];

        return(
        <div>
            <div>
                <div onClick={indexDown} style={{zIndex: -15}}>
                    <HobbySlideshowImage imageLink = {prevPrevImage} renderParam = {-2 + renderOffset}/>
                </div>

                <div onClick={indexDown} style={{zIndex: -5}}>
                    <HobbySlideshowImage imageLink = {prevImage} renderParam = {-1 + renderOffset}/>
                </div>

                <div>
                    <HobbySlideshowImage imageLink = {currImage} renderParam = {0 + renderOffset}/>
                </div>

                <div onClick={indexUp} style={{zIndex: -10}}>
                    <HobbySlideshowImage imageLink = {nextImage} renderParam = {1 + renderOffset}/>
                </div>

                <div onClick={indexUp} style={{zIndex: -20}}>
                    <HobbySlideshowImage imageLink = {nextNextImage} renderParam = {2 + renderOffset}/>
                </div>
            </div>
        </div>);
    } else {
        return <div></div>;
    }
}

export default HobbySlideshow;