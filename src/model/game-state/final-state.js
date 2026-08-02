import { State } from "./base-state.js";

class FinalState extends State { 

    constructor(context) {
        super(context);
    }

     async doAction() {
        this.context.resetCallback();
    }

}

export { FinalState }