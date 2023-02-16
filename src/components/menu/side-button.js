import React, { useEffect, useState } from 'react';
import '../../index.css';

const SideButton = ({
    label,
    navigation,
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

  const navigate = () => {
    console.log("clicked");
};

// Rendering
return (
    <div className="menu-button" onClick={() => navigate()} >
        <a href = {navigation}>
            {label}
        </a>
    </div>
);
}

export default SideButton;