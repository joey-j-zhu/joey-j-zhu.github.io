import React from "react";

export default class ExperienceEntry extends React.Component {
    constructor(
        location,
        date,
        company,
        title,
        description,
    ) {
        super();
        this.location = location;
        this.date = date;
        this.company = company;
        this.title = title;
        this.description = description;
        this.parentList = null;
        this.index = -1;
        this.t = 0;
        this.selected = false;
    }

    render() {
        return (
            <div className="experience-box" onClick={this.select.bind(this)}>
                Berkeley
            </div>
        )
    }

    setParentList(parent) {
        this.parentList = parent;
    }

    setIndex(i) {
        this.index = i;
    }

    idle() {
        if (this.parentList != null) {
            if (this.parentList.getSelected() == this.index && this.parentList.getPrevSelected() == this.index) {
                this.t = 1;
            } else if (this.parentList.getSelected() == this.index && this.parentList.getPrevSelected() != this.index) {
                this.t = 1 - this.parentList.getTransitionTimer();
            } else if (this.parentList.getSelected() != this.index && this.parentList.getPrevSelected() == this.index) {
                this.t = this.parentList.getTransitionTimer();
            } else if (this.parentList.getSelected() != this.index && this.parentList.getPrevSelected() != this.index) {
                this.t = 0;
            }
        }
    }

    select() {
        if (this.parentList != null) {
            this.parentList.selectIndex(this.index);
            this.selected = (this.parentList.getSelected() == this.index) ? true : false;
            if (this.selected) {
                document.documentElement.style.setProperty('--border-color', "red")
            } else {
                document.documentElement.style.setProperty('--border-color', "green")
            }
        } else {
            console.log("Experience entry has no parent list")
        }
        console.log(this.company + " selected, index = " + this.parentList.getSelected());
        console.log(this.selected);

    }
}

