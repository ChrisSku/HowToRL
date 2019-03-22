import React from "react";
import "./Point.css";

const points = {
    S: { text: "S", color: "blue" },
    EP: { text: "+10", color: "green" },
    EN: { text: "-10", color: "red" },
    W: { text: "", color: "black" }
};

const agent = (agent, point) => {
    return agent ? (
        <div className="agent">
            <p>A</p>
        </div>
    ) : point && point.color ? (
        <div className={`point ${point.color}`}>
            <p>{point.text}</p>
        </div>
    ) : (
        <p>{point}</p>
    );
};

const showValue = (value, isAgent, point) => {
    if (value.length > 0) {
        if (value.length === 1) return singleValue(value, isAgent);
        return qValue(value, isAgent, point);
    } else return agent(isAgent, point);
};

const singleValue = (value, isAgent) => {
    return agent(
        isAgent,
        <div
            className="values"
            style={{
                backgroundColor: getRGB(value[0])
            }}
        >
            {value[0].toFixed(2)}
        </div>
    );
};

const qValue = (value, isAgent, point) => {
    return (
        <table className="values">
            <tbody>
                <tr>
                    <td className="values" />
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[1])
                        }}
                    >
                        {value[1].toFixed(2)}
                    </td>
                    <td className="values" />
                </tr>
                <tr>
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[2])
                        }}
                    >
                        {value[2].toFixed(2)}
                    </td>
                    <td className="values">{agent(isAgent, point)}</td>
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[3])
                        }}
                    >
                        {value[3].toFixed(2)}
                    </td>
                </tr>
                <tr>
                    <td className="values" />
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[0])
                        }}
                    >
                        {value[0].toFixed(2)}
                    </td>
                    <td className="values" />
                </tr>
            </tbody>
        </table>
    );
};

const getRGB = value => {
    const red = 127 - value * 7;
    const green = 127 + value * 7;
    return `rgb(${red},${green},127)`;
};

const point = (conf, isAgent) => {
    return conf.state !== "N" && conf.state !== "S" ? (
        <div className={`point ${points[conf.state].color}`}>
            {agent(isAgent, points[conf.state].text)}
        </div>
    ) : (
        <div className="point">
            {showValue(conf.value, isAgent, points[conf.state])}
        </div>
    );
};

const Point = props => {
    return point(props.conf, props.agent);
};

export default Point;
