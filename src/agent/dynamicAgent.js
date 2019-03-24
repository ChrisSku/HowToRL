import Interactions from "./agentInteractions";

class DynamyAgent {
    constructor() {
        this.Interactions = new Interactions();
        this.Interactions.episode = 0;
        this.actions = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        this.table = new Array(16).fill(0);
        this.policy = new Array(16)
            .fill()
            .map(() => [this.actions[this.getRand(4)]]);
        this.dicountFaktor = 0.9;
        this.delta = 0;
        this.deltaMax = 0.1;
        this.reward = -1;
        this.policyStable = false;
    }

    getEpisode() {
        return this.Interactions.episode;
    }

    getMax(arr) {
        const max = Math.max.apply(null, arr);
        const argMaxValues = arr
            .map((value, index) => (value === max ? index : null))
            .filter(value => value !== null);

        return { max, argMaxValues };
    }

    oneStepEvaluation() {
        this.delta = 0;
        this.table.forEach((value, index) => {
            const v = value;
            this.table[index] = this.sumNextValues(index);
            this.delta = this.calcDelta(v, this.table[index]);
        });
    }

    policyEvaluation() {
        do {
            this.delta = 0;
            this.table.forEach((value, index) => {
                const v = value;
                this.table[index] = this.sumNextValues(index);
                this.delta = this.calcDelta(v, this.table[index]);
            });
        } while (this.delta > this.deltaMax);
    }

    policyImprovement() {
        let policyStable = true;
        this.policy.forEach((value, index) => {
            const oldAction = value;
            this.policy[index] = this.argMaxValues(index);
            if (oldAction.filter(val => !this.policy[index].includes(val))[0])
                policyStable = false;
        });
        this.Interactions.episode++;
        this.policyStable = policyStable;
    }

    argMaxValues(state) {
        const row = Math.floor(state / 4) + 1;
        const col = (state % 4) + 1;

        const actionValues = this.actions.map(a => {
            const newStates = this.Interactions.getNextState(a, row, col).map(
                value => (value.row - 1) * 4 + value.col - 1
            );

            const updateValue = newStates.map(
                value =>
                    this.getReward(value) +
                    this.dicountFaktor * this.getTableValue(value)
            );
            return (
                0.8 * updateValue[0] +
                0.1 * updateValue[1] +
                0.1 * updateValue[2]
            );
        });
        return this.getMax(actionValues).argMaxValues.map(
            value => this.actions[value]
        );
    }

    sumNextValues(state) {
        const row = Math.floor(state / 4) + 1;
        const col = (state % 4) + 1;

        const newStates = this.Interactions.getNextState(
            this.policy[state][this.getRand(this.policy[state].length)],
            row,
            col
        ).map(value => (value.row - 1) * 4 + value.col - 1);
        const updateValue = newStates.map(
            value =>
                this.getReward(value) +
                this.dicountFaktor * this.getTableValue(value)
        );
        return (
            0.8 * updateValue[0] + 0.1 * updateValue[1] + 0.1 * updateValue[2]
        );
    }

    getTableValue(state) {
        if (state === 9) return 0;
        if (state === 6) return -10;
        if (state === 15) return 10;
        return this.table[state];
    }

    calcDelta(v, t) {
        const deltaVek = Math.abs(v - t);
        return Math.max(this.delta, deltaVek);
    }

    getReward(state) {
        if (state === 6) return -10;
        if (state === 15) return 10;
        return this.reward;
    }

    getRand(length) {
        return Math.floor(Math.random() * length);
    }
}

export default DynamyAgent;
