import React, { useEffect, useState } from 'react';
import '../../index.css';

import { parseJsonProps, getComponentById, registerComponent } from '../../utils/mapping';

const HobbyButton = ({
    label,
    selectedIndex, // State
    selectIndex,   // Function
    thisIndex,
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
        selectIndex(thisIndex);
    };
    // Rendering
    return (
        <div className="hobby-button" onClick={() => select()} style={{}}>
            {label}
        </div>
    );
}

export default HobbyButton;