import React from "react";
import Cell from "./Cell";

const renderCells = props => {
    if (props.number)
        return Array(4)
            .fill()
            .map((_, i) => <Cell key={i} number={props.number} num={i + 1} />);
    return props.conf.map((value, index) => (
        <Cell key={index} conf={value} agent={props.agent - 1 === index} />
    ));
};

const Row = props => {
    return (
        <tr>
            <td className="number">{props.line ? props.line : ""}</td>
            {renderCells(props)}
        </tr>
    );
};

export default Row;
