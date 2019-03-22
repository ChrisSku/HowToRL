import React, { Component } from "react";
import Row from "./Row";
import "./Gitter.css";

const cellConf = (state, value, policy) => {
    return { state: state, value: value, policy: policy };
};

class Gitter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            world: [
                ["N", "N", "N", "EP"],
                ["N", "W", "N", "N"],
                ["N", "N", "EN", "N"],
                ["S", "N", "N", "N"]
            ]
        };
    }

    getTable(num) {
        return this.props.table ? this.props.table[num] : "NO_VALUES";
    }

    getPolicy(num) {
        return this.props.policy ? this.props.policy[num] : null;
    }

    getRow(rowOfStates, num) {
        return rowOfStates.map((state, index) =>
            cellConf(
                state,
                this.getTable(num * 4 + index),
                this.getPolicy(num * 4 + index)
            )
        );
    }

    renderRows() {
        const { row: aRow, col: aCol } = this.props.agent;

        return this.state.world.map((row, index) => (
            <Row
                key={index}
                line={4 - index}
                conf={this.getRow(row, 3 - index)}
                agent={aRow === 4 - index ? aCol : null}
            />
        ));
    }

    render() {
        return (
            <table className="base">
                <tbody>
                    {this.renderRows()}
                    <Row number={true} />
                </tbody>
            </table>
        );
    }
}

export default Gitter;
