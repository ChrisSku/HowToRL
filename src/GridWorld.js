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
        document.addEventListener("keydown", this.onKeyPressed);
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
                />
                <p>{`Episode: ${this.props.agent.episode}`} </p>
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
