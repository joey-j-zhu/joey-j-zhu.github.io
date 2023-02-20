import React from 'react';

const HobbyStatement = ({
    description,
}) => {
    return (<div style={{
        width: "550px",
        marginTop: "150px",
        marginBottom: "50px",
        float: "left",
    }}>
        <h3>___</h3>
        <p>{description}</p>
    </div>);
};

export default HobbyStatement;