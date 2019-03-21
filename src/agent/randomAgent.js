import Interactions from "./agentInteractions";

class RandAgent {
    constructor() {
        this.Interactions = new Interactions();
    }

    getLocation() {
        return this.Interactions.getLocation();
    }
    resetLocation() {
        this.Interactions.resetLocation();
    }

    step() {
        const state =
            (this.getLocation().row - 1) * 4 + this.getLocation().col - 1;
        const action = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        this.Interactions.moveAgent(action[this.getRand()]);
        if (state === 6 || state === 15) this.resetLocation();
    }

    getRand() {
        return Math.floor(Math.random() * 4);
    }
}

export default RandAgent;
