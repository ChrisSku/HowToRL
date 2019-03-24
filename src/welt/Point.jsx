import React from "react";
import "./Point.css";

const points = {
    S: { text: "S", color: "blue" },
    EP: { text: "+10", color: "green" },
    EN: { text: "-10", color: "red" },
    W: { text: "", color: "black" }
};

const actions = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

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

const showValue = (conf, isAgent, point) => {
    const value = conf.value;
    if (value === "NO_VALUES") return agent(isAgent, point);
    if (!isNaN(value)) return singleValue(conf);
    if (value.length > 0) {
        return qValue(conf, isAgent, point);
    } else return agent(isAgent, point);
};

const singleValue = (conf, isAgent) => {
    return (
        <div>
            <div
                className="values"
                style={{
                    backgroundColor: getRGB(conf.value)
                }}
            >
                {conf.value.toFixed(4)}
            </div>
            {getPolicy(
                actions.map(value => (conf.policy.indexOf(value) > -1 ? 1 : 0))
            )}
        </div>
    );
};

const qValue = (conf, isAgent, point) => {
    const { value, policy } = conf;
    const followPolicy = policy
        ? actions.map(value => (conf.policy.indexOf(value) > -1 ? 1 : 0))
        : value;
    return (
        <table className="values">
            <tbody>
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
                    <td className="values">{getPolicy(followPolicy)}</td>
                </tr>
                <tr>
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[3])
                        }}
                    >
                        {value[3].toFixed(2)}
                    </td>
                    <td className="values">{agent(isAgent, point)}</td>
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[1])
                        }}
                    >
                        {value[1].toFixed(2)}
                    </td>
                </tr>
                <tr>
                    <td className="values" />
                    <td
                        className="values"
                        style={{
                            backgroundColor: getRGB(value[2])
                        }}
                    >
                        {value[2].toFixed(2)}
                    </td>
                    <td className="values" />
                </tr>
            </tbody>
        </table>
    );
};

const getPolicy = valueArr => {
    const max = Math.max.apply(null, valueArr);
    const argMaxValues = valueArr
        .map((value, index) => (value === max ? index : null))
        .filter(value => value !== null);
    if (argMaxValues.length === 1) {
        return (
            <img
                src="images\Arrow.png"
                alt="arrow"
                style={{
                    width: "7px",
                    height: "15px",
                    WebkitTransform: `rotate(${argMaxValues[0] * 90}deg)`,
                    transform: `rotate(${argMaxValues[0] * 90}deg)`
                }}
            />
        );
    }
    if (argMaxValues.length === 2) {
        const val = [0, 1, 2, 3].filter(
            value => argMaxValues.indexOf(value) === -1
        );
        if (Math.abs(val[0] - val[1]) === 2) {
            const rot = val.indexOf(0) > -1 ? 90 : 0;
            return (
                <img
                    src="images\DoubleArrow2.png"
                    alt="arrow"
                    style={{
                        width: "7px",
                        height: "15px",
                        WebkitTransform: `rotate(${rot}deg)`,
                        transform: `rotate(${rot}deg)`
                    }}
                />
            );
        }
        const rot = val => {
            if (val.indexOf(0) > -1) {
                return val.indexOf(1) > -1 ? 180 : 90;
            }
            if (val.indexOf(2) > -1) {
                return val.indexOf(1) > -1 ? 270 : 0;
            }
        };
        return (
            <img
                src="images\DoubleArrow.png"
                alt="arrow"
                style={{
                    width: "15px",
                    height: "15px",
                    WebkitTransform: `rotate(${rot(val)}deg)`,
                    transform: `rotate(${rot(val)}deg)`
                }}
            />
        );
    }
    if (argMaxValues.length === 3) {
        const val = [0, 1, 2, 3].filter(
            value => argMaxValues.indexOf(value) === -1
        );

        return (
            <img
                src="images\TripleArrow.png"
                alt="arrow"
                style={{
                    width: "15px",
                    height: "15px",
                    WebkitTransform: `rotate(${val[0] * 90 + 90}deg)`,
                    transform: `rotate(${val[0] * 90 + 90}deg)`
                }}
            />
        );
    }
    if (argMaxValues.length === 4) {
        return (
            <img
                src="images\QuadArrow.png"
                alt="arrow"
                style={{
                    width: "15px",
                    height: "15px"
                }}
            />
        );
    }
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
            {showValue(conf, isAgent, points[conf.state])}
        </div>
    );
};

const Point = props => {
    return point(props.conf, props.agent);
};

export default Point;
