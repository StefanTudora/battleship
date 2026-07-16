
class GameManager {

    #context;

    constructor(state, context) {
        this.state   = state;
        this.context = context;
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

    getContext() {
        return this.context;
    }

    playGameDev() {
        const nextState = this.state.doAction();
        if (nextState && typeof nextState.then === 'function') {
            return nextState.then(resolved => this.setState(resolved));
        }
        this.setState(nextState);
    }
}

export default GameManager;