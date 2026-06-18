import { State } from "./base-state.js";

class FinalState extends State { 

    constructor(context) {
        super(context);
    }

    doAction() {
        // Here make sure to display the winner and reset the game

        // For dev purposeses, the final state displays only the winner
    }

}

export { FinalState }