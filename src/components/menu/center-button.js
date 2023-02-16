import React, { useEffect, useState } from 'react';
import '../../index.css';

import { parseJsonProps, getComponentById, registerComponent } from '../../utils/mapping';

const CenterButton = ({
    label,
    navigation,
}) => {
    // Idle loop to update transition states
    const [element, setElement] = useState(null);

    const navigate = () => {
        window.scrollTo({
            top: navigation,
            behavior: "smooth",
        });
    };

    // Rendering
    return (
        <div className="menu-button" onClick={() => navigate()} >
            {label}
        </div>
    );
}

export default CenterButton;