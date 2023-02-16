import React from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, THEME_GREEN_HEX, THEME_GRAY_4H_HEX} from "../../utils/colors";

const ExperienceDisplay = ({
    selectedIndex,
    contents,
}) => {

    var activeColor = "#ffffff";
    var idleColor = "#909090";
    return (
        <div style={{
            maxWidth: "600px",
        }}>
            {Object.entries(contents.skillSections).map(
                ([skillSectionName, skills]) => {
                    return (
                        <div style={{
                            margin: "20px",
                            float: "left",
                            minWidth: "250px",
                            marginLeft: "10px",
                            minHeight: "150px",
                        }}>
                            {Object.entries(skills).map(
                                ([skillName, experiences]) => {

                                    var selected = false;
                                    for (var j = 0; j < experiences.length; j++) {
                                        if (experiences[j] == selectedIndex) {
                                            selected = true;
                                        }
                                    }
                                    return (
                                        <div 
                                        className="skill">
                                            <div
                                            style={{
                                                color: selected ? THEME_GREEN_HEX : THEME_GRAY_4H_HEX,
                                            }}>
                                                {skillName}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            )

            }
        </div>
    );
}

export default ExperienceDisplay;
