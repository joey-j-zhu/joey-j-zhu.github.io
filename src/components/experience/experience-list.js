import React from "react";
import { default as ExperienceEntry } from "./experience-entry";

export default class ExperienceList extends React.Component {
    constructor(entries) {
        super();
        this.entries = Array.from(entries);
        for (var i = 0; i < entries.length; i++) {
            entries[i].setParentList(this);
            entries[i].setIndex(i);
        }
        this.transitionIncrement = 0.02;
        this.state = {
            selected: -1,
            prevSelected: -1,
            transitionTimer: 0.0,
        }
    }

    render() {        
        return (
            <div className="experience-list">
                <ExperienceEntry 
                    location={"Berkeley, CA"}
                    date={"AUG 2019 - DEC 2022"}
                    company={"University of California, Berkeley"}
                    title={"B.A. Computer Science, Physics Minor"}
                    description={"description here"}
                    index={0}
                    parentList={this}
                />
                <ExperienceEntry 
                    location={"Seattle, WA"}
                    date={"JAN 2022 - MAY 2022"}
                    company={"Amazon"}
                    title={"Software Engineer Intern"}
                    description={"description here"}
                    index={1}
                    parentList={this}
                />
                <ExperienceEntry 
                    location={"Redwood City, CA"}
                    date={"MAY 2022 - AUG 2022"}
                    company={"University of California, Berkeley"}
                    title={"Software Engineer Intern"}
                    description={"description here"}
                    index={2}
                    parentList={this}
                />
                <ExperienceEntry 
                    location={"Berkeley, CA"}
                    date={"AUG 2022 - NOV 2022"}
                    company={"Lawrence Berkeley Ntl. Laboratory"}
                    title={"Software Engineer Intern"}
                    description={"description here"}
                    index={3}
                    parentList={this}
                />
            </div>
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => this.idle(), 10);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    idle() {
        //console.log(this.state.transitionTimer);
        if (this.state.transitionTimer > 0) {
            this.setState({ transitionTimer: this.state.transitionTimer - this.transitionIncrement });
        } else {
            this.setState({ transitionTimer: 0 });
        }
    }

    getSelected() {
        return this.state.selected;
    }

    getPrevSelected() {
        return this.state.prevSelected;
    }

    getTransitionTimer() {
        return this.state.transitionTimer;
    }

    addEntry(entry) {
        entry.setParentList(this);
        this.entries.append(entry);
    }

    selectIndex(i) {
        if (this.selected != i) {
            this.setState({
                prevSelected: this.state.selected,
                selected: i,
                transitionTimer: 1,
            })
        } else {
            this.setState({
                prevSelected: i,
                selected: -1,
                transitionTimer: 1,
            })
        }
    }
}
