import React, { useEffect, useState } from 'react';
import '../../index.css';

import { parseJsonProps, getComponentById, registerComponent } from '../../utils/mapping';

const HobbyButton = ({
    label,
    index,
}) => {
    // Idle loop to update transition states
    const [element, setElement] = useState(null);

    const select = () => {
        console.log(index);
    };

    // Rendering
    return (
        <div className="hobby-button" onClick={() => select()} >
            {label}
        </div>
    );
}

export default HobbyButton;