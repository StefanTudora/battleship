/*
 * Meant to be extended
 */ 
class State {

    constructor(context) {
        this.context = context;
    }

    /*
     * Meant to be overwritten 
     */
    doAction() {
        throw new Error('Executed undefined action');
    }
}

export { State };