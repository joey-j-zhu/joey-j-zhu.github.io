import React from "react";

const HobbySlideshowImage = ({
    imageLink,
    renderParam,
}) => {

    var dimension = Math.max(0, 500 * (1 - renderParam * renderParam / 4));
    var yPosition = 300 * Math.sin(renderParam * Math.PI / 4);

    return (
        <div style={{
            height: dimension,
            width: dimension,
            position: "relative",
            margin: "auto",
            bottom: yPosition,
            opacity: 0.7,
            backgroundColor: "#00ffff",
        }}>
        </div>
    );
}

export default HobbySlideshowImage;