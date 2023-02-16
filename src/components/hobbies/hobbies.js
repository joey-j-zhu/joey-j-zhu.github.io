import React, { useEffect, useState } from 'react';
import '../../index.css';

import {default as HobbyButton} from './hobby-button';
import {default as HobbyDisplay} from './hobby-display';


function Hobbies() {

  // Idle loop to update transition states
  let transientIncrement = 0.02;
  const [transient, setTransient] = useState(0);

  // Selection Logic
  const [index, setIndex] = useState(0);


    return (
        <div>
            <div className="hobbies-menu">
                <HobbyButton 
                label = "GRAPHIC DESIGN" 
                selectedIndex = {index}
                selectIndex = {setIndex}
                thisIndex = {0} />

                <HobbyButton 
                label = "VISUAL ART" 
                selectedIndex = {index}
                selectIndex = {setIndex}
                thisIndex = {1} />

                <HobbyButton 
                label = "PIANO SOLOIST" 
                selectedIndex = {index}
                selectIndex = {setIndex}
                thisIndex = {2} />

                <HobbyButton 
                label = "ENSEMBLE CELLIST" 
                selectedIndex = {index}
                selectIndex = {setIndex}
                thisIndex = {3} />
            </div>

            <div className="hobbies">
                <HobbyDisplay
                    style={{
                        float:"right",
                    }}
                    selectedIndex = {index}
                    contents = {[{
                            "description": "Graphic Design",
                            "imageLinks": [
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                            ]
                        },
                        {
                            "description": "Visual Art",
                            "imageLinks": [
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                            ]
                        },
                        {
                            "description": "Piano Soloist",
                            "imageLinks": [
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                            ]
                        },
                        {
                            "description": "Ensemble Cellist",
                            "imageLinks": [
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                                "assets/cover-picture.jpg",
                            ]
                        }]
                    } />
            </div>
        </div>
    );
}

export default Hobbies;