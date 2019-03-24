class Agent {
    constructor() {
        this.row = 1;
        this.col = 1;
        this.episode = 1;
        this.actions = {
            ArrowDown: {
                moveFirst: [-1, 0],
                moveSec: [0, 1],
                moveThird: [0, -1]
            },
            ArrowUp: {
                moveFirst: [1, 0],
                moveSec: [0, 1],
                moveThird: [0, -1]
            },
            ArrowLeft: {
                moveFirst: [0, -1],
                moveSec: [1, 0],
                moveThird: [-1, 0]
            },
            ArrowRight: {
                moveFirst: [0, 1],
                moveSec: [1, 0],
                moveThird: [-1, 0]
            }
        };
    }

    getLocation = () => {
        return { row: this.row, col: this.col };
    };

    resetLocation() {
        this.row = 1;
        this.col = 1;
    }

    updateAgent(row, col) {
        this.row = row;
        this.col = col;
    }

    moveAgent(keyPress) {
        const { row, col } = this.moveProb(keyPress, this.row, this.col);
        this.updateAgent(row, col);
    }

    moveProb = (keyPress, row, col) => {
        if (!keyPress.includes("Arrow")) return { row: row, col: col };
        const { moveFirst, moveSec, moveThird } = this.actions[keyPress];
        const action =
            Math.random() > 0.2
                ? this.checkblocked(row, col, moveFirst)
                : Math.random() > 0.5
                ? this.checkblocked(row, col, moveSec)
                : this.checkblocked(row, col, moveThird);
        return action;
    };

    getNextState(keyPress, row, col) {
        const { moveFirst, moveSec, moveThird } = this.actions[keyPress];
        return [
            this.checkblocked(row, col, moveFirst),
            this.checkblocked(row, col, moveSec),
            this.checkblocked(row, col, moveThird)
        ];
    }

    checkblocked(row, col, move) {
        const nRow = row + move[0];
        const nCol = col + move[1];
        if (
            0 < nRow &&
            nRow < 5 &&
            0 < nCol &&
            nCol < 5 &&
            !(nRow === 3 && nCol === 2)
            // &&!(nRow === 2 && nCol === 3)
        ) {
            return { row: nRow, col: nCol };
        }
        return { row: row, col: col };
    }
}

export default Agent;
