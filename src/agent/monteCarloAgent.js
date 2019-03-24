import Interactions from "./agentInteractions";

class MonteCarloAgent {
    constructor() {
        this.Interactions = new Interactions();
        this.actions = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
        this.table = new Array(16).fill();
        this.table = this.table.map(() => [0, 0, 0, 0]);
        this.policy = new Array(16).fill().map(() => this.actions);
        this.returns = this.table;
        this.G = 0;
        this.steps = 10;
        this.last_action = 0;
        this.last_state = this.getState();
        this.stepSize = 0.2;
        this.dicountFaktor = 0.9;
        this.e_greedy = 0.2;
    }

    getEpisode() {
        return this.Interactions.episode;
    }

    getMax(arr) {
        const max = Math.max.apply(null, arr);
        const argMaxValues = arr
            .map((value, index) => (value === max ? index : null))
            .filter(value => value !== null);
        const argMax = argMaxValues[this.getRand(argMaxValues.length)];

        return { max, argMax };
    }

    getLocation() {
        return this.Interactions.getLocation();
    }
    resetLocation() {
        this.Interactions.episode++;
        this.Interactions.resetLocation();
    }

    getState() {
        const { row, col } = this.getLocation();
        return (row - 1) * 4 + col - 1;
    }

    step() {
        const action = this.behaviour_policy();
        const state = this.getState();
        this.updatetable(action, state);
        this.last_action = action;
        this.last_state = state;
        this.Interactions.moveAgent(this.actions[action]);
        if (state === 6 || state === 15) this.resetLocation();
    }

    updatetable(action, state) {
        const col = this.table[this.last_state];

        col[this.last_action] +=
            this.stepSize *
            (this.getReward(state) +
                this.dicountFaktor * this.getTableValue(state, action) -
                this.table[this.last_state][this.last_action]);

        this.table[this.last_state] = col;
    }

    getTableValue(state, action) {
        if (state === 6) return -10;
        if (state === 15) return 10;
        return this.table[state][action];
    }

    getReward(state) {
        if (state === 6) return -10;
        if (state === 15) return 10;
        return -0.1;
    }

    behaviour_policy() {
        return this.e_greedy ? this.eGreedy() : this.greedy();
    }

    eGreedy() {
        return this.e_greedy < Math.random() ? this.greedy() : this.getRand(4);
    }

    greedy() {
        return this.getMax(this.table[this.getState()]).argMax;
    }

    getRand(length) {
        return Math.floor(Math.random() * length);
    }
}

export default MonteCarloAgent;
