
class GameManager {

    constructor() {
        // Intentionally left empty
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    playGame() {
        // Implement when done
    }

    playGameDev() {
        this.setState(this.state.doAction());
    }
}

export { GameManager };