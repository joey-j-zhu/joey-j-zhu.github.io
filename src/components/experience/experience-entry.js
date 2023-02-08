import React from "react";
import { interpolateTrig } from "../../utils/functions";
import { Color, interpolateColor, } from "../../utils/colors";

export default class ExperienceEntry extends React.Component {
    constructor({
        location,
        date,
        company,
        title,
        description,
        parentList,
        index,
    }) {
        super();
        // Props
        this.location = location;
        this.date = date;
        this.company = company;
        this.title = title;
        this.description = description;
        this.parentList = parentList;
        this.index = index;

        // State variables
        this.state = {
            t: 0,
            selected: false,
        }
    }

    
    render() {
        var heightNum = interpolateTrig(0, 100, this.state.t);
        var heightStr = heightNum.toString() + "px";

        var idleColor = new Color({red: 100, green: 100, blue: 100});
        var activeColor = new Color({red: 0, green: 255, blue: 200});
        var color = interpolateColor(idleColor, activeColor, this.state.t, interpolateTrig);

        return (
            <div>
                <div className="experience-entry" onClick={this.select.bind(this)} style={{
                    height: "100px",
                    borderColor: color.getHex(),
                }}>
                    <div>
                        <div style={{
                            fontSize: "12px",
                            float: "left",
                        }}>
                            {this.location}
                        </div>

                        <div style={{
                            fontSize: "12px",
                            float: "right",
                        }}>
                            {this.date}
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
                            {this.company}
                        </div>
                    </div>
                    
                    <div style={{
                        clear: "left",
                    }}>
                        <div style={{
                            float: "left",
                        }}>
                            {this.title}
                        </div>
                    </div>
                </div>
                {this.state.t != 0 && 
                    <div className="experience-entry-description" style={{
                        height: heightStr,
                    }}>
                        {this.description}
                    </div>
                }
            </div>
            
        )
    }

    setParentList(parent) {
        this.parentList = parent;
    }

    setIndex(i) {
        this.index = i;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.idle(), 30);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    idle() {
        //console.log(this.state.t, this.parentList.getSelected(), this.index);
        if (this.parentList != null) {
            if (this.parentList.getSelected() == this.index && this.parentList.getPrevSelected() == this.index) {
                this.setState({t: 0});

            } else if (this.parentList.getSelected() == this.index && this.parentList.getPrevSelected() != this.index) {
                this.setState({t: 1 - this.parentList.getTransitionTimer()});

            } else if (this.parentList.getSelected() != this.index && this.parentList.getPrevSelected() == this.index) {
                this.setState({t: this.parentList.getTransitionTimer()});

            } else if (this.parentList.getSelected() != this.index && this.parentList.getPrevSelected() != this.index) {
                this.setState({t: 0});

            }
        }
    }

    select() {
        if (this.parentList != null) {
            this.parentList.selectIndex(this.index);

            this.setState({selected: this.parentList.getSelected() == this.index ? true : false})

            if (this.isSelected) {
                document.documentElement.style.setProperty('--border-color', "red")
            } else {
                document.documentElement.style.setProperty('--border-color', "green")
            }
        } else {
            console.log("Experience entry has no parent list")
        }
        //console.log(this.company + " selected, index = " + this.parentList.getSelected());
        //console.log(this.state.selected);
    }

    isSelected() {
        return this.index == this.parentList.state.selected;
    }
}

