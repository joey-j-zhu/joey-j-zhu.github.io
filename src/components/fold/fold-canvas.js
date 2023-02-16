import React, { useState, useEffect } from 'react';
import { default as FoldGraphics } from'./fold-graphics';

const FoldCanvas = () => {
    
    const [system, setSystem] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSystem(system + 1);
            //console.log(system);
        }, 30);
        return () => clearInterval(interval);
      }, [system]);

    return (
        <canvas id="fold-graphics" width="300px" height="300px" style={{border:"1px solid green"}}>
            <FoldGraphics system={system} />
        </canvas>
    );
};

export default FoldCanvas;