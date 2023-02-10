import React from "react";
import { default as ExperienceEntry } from "./experience-entry";

// For now this is mostly just a static container to hold a list of elements
export default class ExperienceList extends React.Component {
    constructor({
        props,
    }) {
        super();
    }

    render() {  
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
    //     return (
    //         <ul>
    //             {this.entries.map( entryProps =>  {
    //                 return (<li key={ entryProps }>
    //                     <ExperienceEntry props={entryProps} />
    //                 </li>);
    //             })}
    //         </ul>
    //     );    
    // }
}
