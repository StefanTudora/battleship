
class GameManager {

    #context;

    constructor(state, context) {
        this.state    = state;
        this.#context = context;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    getContext() {
        return this.context;
    }

    provideHumanPlayerCoord(point) {
        const activePlayer = this.#context.getActivePlayer();
        if (activePlayer?.playerType !== 'human') return;
        if (typeof activePlayer.resolveMove === 'function') {
            activePlayer.resolveMove(point);
        }
    }

    async playGame() {
        const nextState = await this.state.doAction();
        if (nextState && typeof nextState.then === 'function') {
            return nextState.then(resolved => this.setState(resolved));
        }
        this.setState(nextState);
    }
}

export default GameManager;