const EnergyQueue = require("messageQueue_energyQueue");

class Structure {
    constructor(structure) {
        this.structure = structure;
        this.energyRate = 0.6;
    }

    loop() {
        throw new Error("Abstract method");
    }

    checkEnergy() {
        const storedEnergy = this.structure.store[RESOURCE_ENERGY];
        const energyCapacity = this.structure.store.getCapacity(RESOURCE_ENERGY);
        if (storedEnergy < energyCapacity * this.energyRate) {
            this.sendTransferEnergyMessage(energyCapacity - storedEnergy);
            console.log(EnergyQueue.queue.length);
        }
    }

    sendTransferEnergyMessage(amount) {
        EnergyQueue.send("transfer", this.structure.id, amount);
    }

    sendWithdrawEnergyMessage(amount) {
        EnergyQueue.send("withdraw", this.structure.id, amount);
    }
}

module.exports = Structure;