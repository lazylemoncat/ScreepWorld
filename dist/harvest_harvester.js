class Harvester {
    constructor(creep) {
        this.creep = creep;
    }

    loop() {
        if (this.checkHarvesting()) {
            this.goHarvest();
        } else {
            this.transferEnergy();
        }
    }

    checkHarvesting() {
        if (this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.harvesting = false;
        } else if (this.creep.store.getUsedCapacity() == 0) {
            this.creep.memory.harvesting = true;
        }
        return this.creep.memory.harvesting;
    }

    goHarvest() {
        const source = Game.getObjectById(this.creep.memory.sourceId);
        if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(source);
        }
    }

    transferEnergy() {
        throw new Error("Abstract method");
    }
}

module.exports = Harvester;