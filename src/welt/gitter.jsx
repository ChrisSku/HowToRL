import React, { Component } from "react";
import Row from "./Row";
import "./Gitter.css";

const cellConf = (state, agent, value, policy) => {
    return { state: state, agent: agent, value: value, policy: policy };
};

class Gitter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            world: [
                [
                    cellConf("N", 0, "r"),
                    cellConf("N", 0, "r"),
                    cellConf("N", 0, "r"),
                    cellConf("EP", null, null)
                ],
                [
                    cellConf("N", 0, "r"),
                    cellConf("W", null, null),
                    cellConf("N", 0, "r"),
                    cellConf("N", 0, "r")
                ],
                [
                    cellConf("N", 0, "r"),
                    cellConf("N", 0, "r"),
                    cellConf("EN", null, null),
                    cellConf("N", 0, "r")
                ],
                [
                    cellConf("S", null, null),
                    cellConf("N", 0, "r"),
                    cellConf("N", 0, "r"),
                    cellConf("N", 0, "r")
                ]
            ]
        };
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
            <table tabIndex="0" onKeyDown={event => this.moveAgent(event.key)}>
                <tbody>
                    {this.renderRows()}
                    <Row number={true} />
                </tbody>
            </table>
        );
    }
}

export default Gitter;
