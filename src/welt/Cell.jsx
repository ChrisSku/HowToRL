import React from "react";
import Point from "./Point";

const getCell = (conf, agent) => {
    return <Point conf={conf} agent={agent} />;
};

const Cell = probs => {
    return (
        <td className={probs.number ? "number" : ""}>
            {probs.number ? probs.num : getCell(probs.conf, probs.agent)}
        </td>
    );
};

export default Cell;
