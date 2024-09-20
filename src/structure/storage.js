const structure = require("structure_structure");
const EnergyQueue = require("messageQueue_energyQueue");

class Sotrage extends structure {
    constructor(storage) {
        super(storage);
        this.energyRate = 0.3;
    }

    loop() {
        if (EnergyQueue.getSizeByType("transfer") == 0) {
            this.checkEnergy();
        }
    }
}

module.exports = Sotrage;