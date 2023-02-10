import React from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, } from "../../utils/colors";

const ExperienceDisplay = ({
    selectedIndex,
    contents,
}) => {
    const messages = [0, 1, 2, 3];
    var message = messages[selectedIndex];
    return (<div className="skill-box">
        {message}
    </div>);
}

export default ExperienceDisplay;
