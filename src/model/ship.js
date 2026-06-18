
class Ship { 

    constructor (length) {
        this.length = length;
        this.hits   = 0;
        this.sunk   = false;
    }

    hit() {
        if (this.isSunk()) {
            // Misfire, cannot sink again
            return;
        }
        if (++ this.hits == this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}

export { Ship };