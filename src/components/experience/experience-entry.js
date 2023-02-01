export class ExperienceEntry {
    constructor(
        location,
        date,
        company,
        title,
        description,
    ) {
        this.location = location;
        this.date = date;
        this.company = company;
        this.title = title;
        this.description = description;
        this.parentList = null;
        this.index = -1;
        this.t = 0;
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
        } else {
            console.log("Experience entry has no parent list")
        }
        console.log(this.company + " selected, index = " + this.parentList.getSelected());
    }

    setParentList(parent) {
        this.parentList = parent;
        console.log("parent list set for " + this.company)
    }

    setIndex(i) {
        this.index = i;
    }
}
