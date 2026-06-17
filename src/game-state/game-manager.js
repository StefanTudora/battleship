
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
        // while (!(this.state instanceof HumanState)) {
        //     // Transition through state whilst a human interaction is not needed
        //     this.setState(this.state.doAction());
        // }
    }

    playGameDev() {
        // try {
            this.setState(this.state.doAction());
        // } catch (error) {
        //     console.log("Caught error: " + error);
        // }
    }
}

export { GameManager };