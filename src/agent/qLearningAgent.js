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
        const action = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        this.Interactions.moveAgent(action[this.getRand()]);
    }

    getRand() {
        return Math.floor(Math.random() * 4);
    }
}

export default RandAgent;
