import { GunnerStrategy } from "./gunner-strategy.js";


class SeasonedGunner extends GunnerStrategy {

    constructor(observableBoard) {
        super(observableBoard);
    }

    initPoints() {
        // Reduce the total number of search points by half
        for (let row = 0; row < 10; ++row) {
            for (let col = 0; col < 10; ++col) {
                if ((row + col) % 2) {
                    continue;
                }
                this.coordinates.push([row, col]);
            }
        }
    }
}

export default SeasonedGunner;