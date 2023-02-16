import React, { useState, useEffect } from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, THEME_GREEN, THEME_GRAY_4B, THEME_GRAY_6B, THEME_GRAY_6H} from "../../utils/colors";

const ExperienceEntry = ({
        selectedIndex, // State
        selectIndex,   // Function
        thisIndex,
        contents,
    }) => {
    
    // Idle loop to update transition states
    const [transient, setTransient] = useState(0);
    const [isSelected, setIsSelected] = useState(false);
    const incrementSize = 0.05;
    useEffect(() => {
        const interval = setInterval(() => {
            setTransient(isSelected ? (transient < 1 ? transient + incrementSize : 1)
                : (transient > 0 ? transient - incrementSize : 0))
        }, 10);
        return () => clearInterval(interval);
      }, [transient, setTransient, isSelected]);

    useEffect(() => {
        setIsSelected(thisIndex == selectedIndex);
    }, [selectedIndex]);

    const select = () => {
        selectIndex(thisIndex == selectedIndex ? -1 : thisIndex);
    };

    // Rendering
    var windowHeight = interpolateTrig(0, 100, transient).toString() + "px";
    var verticalPadding = interpolateTrig(0, 20, transient).toString() + "px";

    var idleColor = THEME_GRAY_6B;
    var activeColor = THEME_GREEN;
    var color = interpolateColor(idleColor, activeColor, transient, interpolateTrig);

    return (
        <div onClick={() => select()} >
            <div className="experience-entry"style={{
                height: "100px",
                borderColor: color.getHex(),
                borderBottomLeftRadius: transient > 0 ? "0px" : "10px",
                borderBottomRightRadius: transient > 0 ? "0px" : "10px",
            }}>
                <div>
                    <div style={{
                        fontSize: "12px",
                        color: THEME_GRAY_6H.getHex(),
                        float: "left",
                    }}>
                        {contents.location}
                    </div>

                    <div style={{
                        fontSize: "12px",
                        color: THEME_GRAY_6H.getHex(),
                        float: "right",
                    }}>
                        {contents.date}
                    </div>
                </div>

                <div style={{
                    clear: "left",
                }}>
                    <div style={{
                        fontSize: "24px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        float: "left",
                    }}>
                        {contents.company}
                    </div>
                </div>
                
                <div style={{
                    clear: "left",
                }}>
                    <div style={{
                        float: "left",
                        color: THEME_GREEN.getHex(),
                    }}>
                        {contents.title}
                    </div>
                </div>
            </div>
            {transient > 0 && 
                <div className="experience-entry-description" style={{
                    height: windowHeight,
                    paddingTop: verticalPadding,
                    paddingBottom: verticalPadding,
                    overflow: "hidden",
                }}>
                    {contents.description}
                </div>
            }
        </div>
        
    );
}

export default ExperienceEntry;