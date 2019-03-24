import React, { Component } from "react";
import Gitter from "./welt/gitter";
import DynamicAgent from "./agent/dynamicAgent";
import MonteCarloAgent from "./agent/monteCarloAgent";

class GridWorld extends Component {
    _isMounted = false;
    wait = true;
    dynamic = this.props.agent instanceof DynamicAgent;
    monteCarlo = this.props.agent instanceof MonteCarloAgent;
    constructor(props) {
        super(props);
        this.dynamic
            ? (this.state = {
                  agentLocation: this.props.agent.getEpisode(),
                  policyStable: this.props.agent.policyStable,
                  start: false,
                  wait: this.wait
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
        if (this.state.start && this._isMounted && this.wait)
            if (this.dynamic) {
                if (!this.state.policyStable)
                    setTimeout(() => {
                        this.runPolicyEvaluationStep();
                    }, 500);
                else this.setState({ start: false });
            } else if (this.monteCarlo) {
            } else
                setTimeout(() => {
                    this.props.agent.step();
                    return this.updateLocation();
                }, 50);
    }

    runPolicyEvaluationStep() {
        if (this.state.start) this.runPolicyIteration();
        else {
            this.props.agent.oneStepEvaluation();
            this.setState({
                policyStable: this.props.agent.policyStable
            });
        }
    }

    runPolicyIteration() {
        this.wait = false;
        this.props.agent.policyEvaluation();
        this.props.agent.policyImprovement();
        this.setState({
            policyStable: this.props.agent.policyStable
        });
        this.wait = true;
        setTimeout(() => {
            this.setState({ wait: this.wait });
        }, 500);
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
        console.log(event.key);
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
