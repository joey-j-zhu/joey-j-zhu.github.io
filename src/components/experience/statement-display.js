import React from "react";

export default class StatementDisplay extends React.Component {
    constructor ({
        props,
    }) {
        super();
        this.statement = props.statement;
        console.log()
    }

    render() {
        return (
            <div className="statement-box">
                <h3>___</h3>
                <h3>{this.statement}</h3>
            </div>
        );
    }
}