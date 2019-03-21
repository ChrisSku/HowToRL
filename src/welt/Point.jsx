import React from "react";
import "./Point.css";

const points = {
    S: { text: "S", color: "blue" },
    EP: { text: "+10", color: "green" },
    EN: { text: "-10", color: "red" },
    W: { text: "", color: "black" }
};

const agent = (agent, text) => {
    return agent ? <div className="agent">A</div> : <p>{text}</p>;
};

const point = (conf, isAgent) => {
    return conf.state !== "N" ? (
        <div className={`point ${points[conf.state].color}`}>
            {agent(isAgent, points[conf.state].text)}
        </div>
    ) : (
        <div className="point">{agent(isAgent, "")}</div>
    );
};

const Point = props => {
    return point(props.conf, props.agent);
};

export default Point;
