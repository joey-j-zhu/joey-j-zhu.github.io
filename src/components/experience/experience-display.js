import React from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, } from "../../utils/colors";

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
                                        <div style={{
                                            color: selected ? "#ffffff" : "#909090"
                                        }}>
                                            {skillName}
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
