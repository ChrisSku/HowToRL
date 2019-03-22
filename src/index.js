import React from "react";
import ReactDOM from "react-dom";
import GridWorld from "./GridWorld";
import RandAgent from "./agent/randomAgent";
import QAgent from "./agent/qLearningAgent";
import DynamicAgent from "./agent/dynamicAgent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Navbar = probs => {
    console.log(probs.location.pathname);
    return (
        <div className="ui secondary pointing menu">
            <Link className="item" to="/">
                Random
            </Link>
            <Link className="item" to="/q-learning">
                Q-Learning
            </Link>
            <Link className="item" to="/dp">
                DP
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
                    path="/q-learning"
                    component={() => GridWorldBuilder(new QAgent())}
                />
                <Route
                    path="/dp"
                    component={() => GridWorldBuilder(new DynamicAgent())}
                />
            </div>
        </Router>
    );
}

ReactDOM.render(<AppRouter />, document.getElementById("root"));
