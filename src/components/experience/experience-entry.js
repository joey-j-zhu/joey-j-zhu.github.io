import React, { useState, useEffect } from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, } from "../../utils/colors";

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
        }, 30);
        return () => clearInterval(interval);
      }, [transient, setTransient, isSelected]);

    useEffect(() => {
        setIsSelected(thisIndex == selectedIndex);
    }, [selectedIndex]);


    const select = () => {
        selectIndex(thisIndex == selectedIndex ? -1 : thisIndex);
    };

    // Rendering
    var heightNum = interpolateTrig(0, 100, transient);
    var heightStr = heightNum.toString() + "px";

    var idleColor = new Color({red: 100, green: 100, blue: 100});
    var activeColor = new Color({red: 0, green: 255, blue: 200});
    var color = interpolateColor(idleColor, activeColor, transient, interpolateTrig);

    return (
        <div onClick={() => select()} >
            <div className="experience-entry"style={{
                height: "100px",
                borderColor: color.getHex(),
            }}>
                <div>
                    <div style={{
                        fontSize: "12px",
                        float: "left",
                    }}>
                        {contents.location}
                    </div>

                    <div style={{
                        fontSize: "12px",
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
                    }}>
                        {contents.title}
                    </div>
                </div>
            </div>
            {transient > 0 && 
                <div className="experience-entry-description" style={{
                    height: heightStr,
                }}>
                    {contents.description}
                </div>
            }
        </div>
        
    );
}

export default ExperienceEntry;