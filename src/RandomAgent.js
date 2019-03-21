import React, { Component } from "react";
import Gitter from "./welt/gitter";
import Agent from "./agent/randomAgent";

class RandomAgent extends Component {
    constructor(props) {
        super(props);
        this.Agent = new Agent();
        this.state = {
            agentLocation: this.Agent.getLocation()
        };
    }

    componentDidMount() {
        this.updateLocation();
    }

    componentDidUpdate() {
        const { row, col } = this.Agent.getLocation();
        if ((row === 4 && col === 4) || (row === 2 && col === 3)) {
            setTimeout(() => {
                this.Agent.resetLocation();
                this.updateLocation();
                return null;
            }, 100);
        } else {
            setTimeout(() => {
                this.Agent.step();
                this.updateLocation();
                return null;
            }, 100);
        }
    }

    updateLocation = () => {
        this.setState({
            agentLocation: this.Agent.getLocation()
        });
    };

    render() {
        return (
            <div className="centered">
                <Gitter agent={this.state.agentLocation} />
            </div>
        );
    }
}

export default RandomAgent;
