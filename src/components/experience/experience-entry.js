import React from "react";

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

    interpolate(a, b, t) {
        let tsin = 1 - Math.cos(Math.PI * t / 2.0);
        return a + tsin * (b - a);
    }

    render() {
        var heightNum = this.interpolate(0, 100, this.state.t);
        var heightStr = heightNum.toString() + "px";

        return (
            <div>
                <div className="experience-box" onClick={this.select.bind(this)} style={{
                    height: "100px",
                }}>
                    <div>
                        {this.location}
                    </div>
                    <div>
                        {this.date}
                    </div>
                    <div>
                        {this.company}
                    </div>
                    <div>
                        {this.title}
                    </div>
                </div>
                {this.state.t != 0 && 
                    <div className="experience-description-box" style={{
                        height: heightStr
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

