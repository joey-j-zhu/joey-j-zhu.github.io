import React from "react";
import { default as ExperienceEntry } from "./experience-entry";

export default class ExperienceList extends React.Component {
    constructor(entries) {
        super();
        this.entries = entries;
        for (var i = 0; i < entries.length; i++) {
            entries[i].setParentList(this);
            entries[i].setIndex(i);
        }
        this.selected = -1;
        this.prevSelected = -1;
        this.transitionTimer = 0.0;
        this.transitionInc = 0.1;
    }

    render() {
        console.log("entries")
        const elements = (this.entries).map((entry) =>
            <li>
                {entry}
            </li>
        );
        return (
            // <ul>
            //     {elements}
            // </ul>
            <div className="experience-list">
                <ExperienceEntry />
                <ExperienceEntry />
                <ExperienceEntry />
                <ExperienceEntry />
            </div>
        );
    }

    idle() {
        if (this.transitionTimer > 0) {
            this.transitionTimer -= this.transitionInc;
            console.log(this.transitionTimer);
        } else {
            this.transitionTimer = 0;
        }
    }

    getSelected() {
        return this.selected;
    }

    getPrevSelected() {
        return this.prevSelected;
    }

    getTransitionTimer() {
        return this.transitionTimer;
    }

    addEntry(entry) {
        this.entries.append(entry);
    }

    selectIndex(i) {
        if (this.selected != i) {
            this.prevSelected = this.selected;
            this.selected = i;
        } else {
            this.prevSelected = i;
            this.selected = -1;
        }
        this.transitionTimer = 1;
    }
}
