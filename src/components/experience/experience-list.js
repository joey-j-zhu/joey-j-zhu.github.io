export class ExperienceList {
    constructor(entries) {
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

    idle() {
        this.transitionTimer -= this.transitionInc;
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