import { PlayerState } from './player-state.js';

class ResetState extends State {

    doAction() {
        // Always start with the human player
        return new PlayerState();
    }
}