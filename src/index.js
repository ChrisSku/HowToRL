import React from "react";
import ReactDOM from "react-dom";
import GridWorld from "./GridWorld";
import RandAgent from "./agent/randomAgent";
import QAgent from "./agent/qLearningAgent";
import DynamicAgent from "./agent/dynamicAgent";
import MonteCarloAgent from "./agent/monteCarloAgent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Navbar = probs => {
    const path = probs.location.pathname;
    return (
        <div className="ui secondary pointing menu">
            <Link className={`item ${path === "/" ? "active" : ""}`} to="/">
                Random
            </Link>
            <Link className={`item ${path === "/td" ? "active" : ""}`} to="/td">
                Temporal Difference
            </Link>
            <Link className={`item ${path === "/dp" ? "active" : ""}`} to="/dp">
                Dynamic Programming
            </Link>
            <Link
                className={`item ${path === "/monte-carlo" ? "active" : ""}`}
                to="/monte-carlo"
            >
                Monte Carlo
            </Link>
        </div>
    );
};

function GridWorldBuilder(agent) {
    return <GridWorld agent={agent} />;
}

function AppRouter() {
    return (
        <Router>
            <div className="ui container">
                <Route path="/" component={Navbar} />
                <Route
                    path="/"
                    exact
                    component={() => GridWorldBuilder(new RandAgent())}
                />
                <Route
                    path="/td"
                    component={() => GridWorldBuilder(new QAgent())}
                />
                <Route
                    path="/dp"
                    component={() => GridWorldBuilder(new DynamicAgent())}
                />
                <Route
                    path="/monte-carlo"
                    component={() => GridWorldBuilder(new MonteCarloAgent())}
                />
            </div>
        </Router>
    );
}

ReactDOM.render(<AppRouter />, document.getElementById("root"));
