import { GunnerStrategy } from "./gunner-strategy.js";

class CalibratedGunnerStrategy extends GunnerStrategy {

    constructor(observableBoard) {
        super(observableBoard);
        this.axisPlacementOfShip = undefined;
    }

    executeStrategy() {
        let attackCoord = undefined;
        let prevCoord = undefined;
        if (this.searchPoints.length !== 0) {
            while (this.searchPoints.length !== 0) {
                const [point, prevPoint] = this.searchPoints.shift();
                console.log("Current " + point);
                console.log("Prev " + prevPoint);
                if (prevPoint !== undefined && this.isPointAlongShipPlacement(point, prevPoint) === false) {
                    // Skip point only if we have the placement information, else resume analysis
                    continue;
                }
                attackCoord = point;
                prevCoord = prevPoint;
                break;
            }
        }
        if (attackCoord === undefined) {
            // Have no search points ,randomly attack the board
            while (this.coordinates.length > 0) {
                attackCoord = this.coordinates.pop();
                if (this.wasPointVisited(attackCoord) == false) {
                    // Skip all points that have been explored;
                    break;
                }
            }
        }
        this.visitCell(attackCoord);
        const status = this.observableBoard.receiveAttack(attackCoord);
        switch (status) {
            case "Hit":
                this.calibrateTargetingSystem(attackCoord, prevCoord);
                break;
            case "Sunk":
                // The ship has been sunked, dispose of the search points
                this.clearTargetingSystem();
                break;
            case "Miss":
                // Nothing to do here
                break;
        }
    }

    calibrateTargetingSystem(attackCoord, prevPoint) {
        const onAxis = this.isPointAlongShipPlacement(attackCoord, prevPoint);
        if (onAxis == undefined && prevPoint !== undefined) {
            if (attackCoord[0] == prevPoint[0]) {
                this.axisPlacementOfShip = 'Ox';
            } else {
                this.axisPlacementOfShip = 'Oy';
            }
        }
        const diff = [-1, 0, 1, 0, -1];
        // Add the neighbouring points to the search
        for (let idx = 0; idx < 4; ++idx) {
            const dx = attackCoord[0] + diff[idx];
            const dy = attackCoord[1] + diff[idx + 1];
            if (Math.min(dx, dy) < 0 || dx >= this.rows || dy >= this.cols || this.wasPointVisited([dx, dy])) {
                // Skip point if out of bounds or already visited
                continue;
            }
            if (this.isPointAlongShipPlacement(attackCoord, [dx, dy]) == false) {
                continue;
            }
            this.searchPoints.push([[dx, dy], attackCoord]);
        }
    }

    clearTargetingSystem() {
        super.clearTargetingSystem();
        this.axisPlacementOfShip = undefined;
    }

    isPointAlongShipPlacement(curr, prev) {
        console.log("Doing computations for: " + curr + " " + prev);
        if (this.axisPlacementOfShip === undefined || prev === undefined) {
            return undefined;
        }
        if (curr[0] == prev[0] && this.axisPlacementOfShip == 'Ox') {
            return true;
        }
        if (curr[1] == prev[1] && this.axisPlacementOfShip == 'Oy') {
            return true;
        }
        return false;
    }
}

export { CalibratedGunnerStrategy };