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
                [
                    cellConf("N", this.getTable(12), "r"),
                    cellConf("N", this.getTable(13), "r"),
                    cellConf("N", this.getTable(14), "r"),
                    cellConf("EP", null, null)
                ],
                [
                    cellConf("N", this.getTable(8), "r"),
                    cellConf("W", null, null),
                    cellConf("N", this.getTable(10), "r"),
                    cellConf("N", this.getTable(11), "r")
                ],
                [
                    cellConf("N", this.getTable(4), "r"),
                    cellConf("N", this.getTable(5), "r"),
                    cellConf("EN", null, null),
                    cellConf("N", this.getTable(7), "r")
                ],
                [
                    cellConf("S", this.getTable(0), null),
                    cellConf("N", this.getTable(1), "r"),
                    cellConf("N", this.getTable(2), "r"),
                    cellConf("N", this.getTable(3), "r")
                ]
            ]
        };
    }

    getTable(num) {
        return this.props.table ? this.props.table[num] : [];
    }

    getAgentLocation = line => {
        if (line === this.state.agent.row) return this.state.agent.col;
    };

    renderRows() {
        const { row: aRow, col: aCol } = this.props.agent;
        return this.state.world.map((row, index) => (
            <Row
                key={index}
                line={4 - index}
                conf={row}
                agent={aRow === 4 - index ? aCol : null}
            />
        ));
    }

    render() {
        return (
            <table tabIndex="0">
                <tbody>
                    {this.renderRows()}
                    <Row number={true} />
                </tbody>
            </table>
        );
    }
}

export default Gitter;
