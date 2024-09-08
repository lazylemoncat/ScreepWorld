const EnergyQueue = require("messageQueue_energyQueue");

class Transferer {
    constructor(creep) {
        this.creep = creep;
    }

    loop() {
        if (this.checkTransferring()) {
            this.goTransfer();
        } else {
            this.getResource();
        }
    }

    checkTransferring() {
        if (this.creep.store.getUsedCapacity() == 0) {
            this.creep.memory.transferring = false;
        } else if (this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.transferring = true;
        }
        return this.creep.memory.transferring;
    }

    goTransfer() {
        throw new Error("Abstract method");
    }

    getResource() {
        throw new Error("Abstract method");
    }

    checkEnergyTarget() {
        if (this.creep.memory.energyTarget == undefined) {
            return false;
        }
        const target = Game.getObjectById(this.creep.memory.energyTarget);
        if (target == undefined || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            this.creep.memory.energyTarget = undefined;
            return false;
        }
        return true;
    }

    getTarget() {
        const targetObject = EnergyQueue.receive("transfer", this.creep.store.getFreeCapacity());
        if (targetObject == undefined) {
            return undefined;
        }
        this.creep.memory.energyTarget = targetObject.id;
        return targetObject;
    }
}

module.exports = Transferer;