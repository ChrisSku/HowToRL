import React from "react";

const renderRows = table => {
    return table.map((value, index) => (
        <tr key={index}>
            {value.map((val, ind) => (
                <td key={ind}>
                    <p>{Math.round(val * 100) / 100}</p>
                </td>
            ))}
        </tr>
    ));
};

const QTable = props => {
    return (
        <table tabIndex="0">
            <tbody>{renderRows(props.table)}</tbody>
        </table>
    );
};

export default QTable;
