const System = class {
    constructor ({

    }) {
        this.timer = 0;
    }

    update(increment) {
        this.timer += increment;
        return this;
    }
}

export default System;