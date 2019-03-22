import React, { Component } from "react";
import Gitter from "./welt/gitter";
import DynamicAgent from "./agent/dynamicAgent";

class GridWorld extends Component {
    _isMounted = false;
    dynamic = this.props.agent instanceof DynamicAgent;
    constructor(props) {
        super(props);
        this.dynamic
            ? (this.state = {
                  agentLocation: this.props.agent.getEpisode(),
                  policyStable: false,
                  start: false
              })
            : (this.state = {
                  agentLocation: this.props.agent.getLocation(),
                  start: false
              });
    }

    componentDidMount() {
        this._isMounted = true;
        this.updateLocation();
        document.addEventListener("keydown", this.onKeyPressed);
    }

    componentDidUpdate() {
        if (this.state.start && this._isMounted)
            if (this.dynamic) {
                if (!this.state.policyStable)
                    setTimeout(() => {
                        this.runPolicyIteration();
                    }, 1000);
                else this.setState({ start: false });
            } else
                setTimeout(() => {
                    this.props.agent.step();
                    return this.updateLocation();
                }, 50);
    }

    runPolicyIteration() {
        this.props.agent.policyEvaluation();
        this.setState({ policyStable: this.props.agent.policyImprovement() });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateLocation = () => {
        if (!this.dynamic)
            this.setState({
                agentLocation: this.props.agent.getLocation()
            });
    };

    getTable = () => {
        if (this.props.agent.table) return this.props.agent.table;
        return null;
    };

    onKeyPressed = event => {
        const keysBack = ["PageUp", "ArrowLeft", "ArrowDown", "Backspace"];
        const keysNext = ["ArrowRight", "ArrowUp", "Enter", "PageDown"];
        if (keysNext.indexOf(event.key) > -1) {
            event.preventDefault();
            this.setState({ start: true });
        }
        if (keysBack.indexOf(event.key) > -1) {
            event.preventDefault();
            this.setState({ start: false });
        }
        if (event.key === "Escape") {
            window.location.reload();
        }
    };

    render() {
        return (
            <div className="centered">
                <Gitter
                    agent={this.state.agentLocation}
                    table={this.getTable()}
                    policy={this.props.agent.policy}
                    dynamic={this.dynamic}
                />
                <p>
                    {`${
                        this.dynamic ? "Iterations: " : "Episodes: "
                    }${this.props.agent.getEpisode()}`}
                </p>
                <button
                    className="ui button"
                    onClick={() => this.setState({ start: !this.state.start })}
                >
                    {this.state.start ? "stop" : "start"}
                </button>
            </div>
        );
    }
}

export default GridWorld;
