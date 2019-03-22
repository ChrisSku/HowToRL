import React, { Component } from "react";
import Gitter from "./welt/gitter";

class GridWorld extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            agentLocation: this.props.agent.getLocation(),
            start: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.updateLocation();
    }

    componentDidUpdate() {
        if (this.state.start)
            setTimeout(() => {
                if (this._isMounted) {
                    this.props.agent.step();
                    return this.updateLocation();
                }
            }, 50);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateLocation = () => {
        this.setState({
            agentLocation: this.props.agent.getLocation()
        });
    };

    getTable = () => {
        if (this.props.agent.QTable) return this.props.agent.QTable;
        return null;
    };

    render() {
        return (
            <div className="centered">
                <Gitter
                    agent={this.state.agentLocation}
                    table={this.getTable()}
                />
                <button
                    onClick={() => this.setState({ start: !this.state.start })}
                >
                    {this.state.start ? "stop" : "start"}
                </button>
            </div>
        );
    }
}

export default GridWorld;
