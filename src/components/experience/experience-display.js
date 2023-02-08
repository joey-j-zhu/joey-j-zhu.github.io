import React from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, } from "../../utils/colors";

export default class ExperienceDisplay extends React.Component {
    constructor({
        parentList,
    }) {
        super();
        this.parentList = parentList;

        // State variables
        this.state = {
            t: 0,
            selected: false,
        }
    }

    
    render() {
        this.setState({ t: this.parentList.getSelected()})
        if (this.state.t == 0) {
            return( <div className="skill-box">
                UC Berkeley entry
            </div>);

        } else if (this.state.t == 1) {
            return (<div className="skill-box">
                Amazon entry
            </div>);

        } else if (this.state.t == 2) {
            return (<div className="skill-box">
                NimbleRx entry
            </div>);

        } else if (this.state.t == 3) {
            return (<div className="skill-box">
                LBNL entry
            </div>);

        }  
    }

    setParentList(parent) {
        this.parentList = parent;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.idle(), 30);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    idle() {

    }

    select() {
        
    }
}

