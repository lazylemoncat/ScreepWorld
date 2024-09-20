class Upgrader {
    constructor(creep) {
        this.creep = creep
    }
    
    loop() {
        if (this.checkUpgrading()) {
            this.goUpgrade();
        } else {
            this.getEnergy();
        }
    }

    checkUpgrading() {
        if (this.creep.store.getUsedCapacity() == 0) {
            this.creep.memory.upgrading = false;
        } else if (this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.upgrading = true;
        }
        return this.creep.memory.upgrading;
    }

    goUpgrade() {
        if (this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller);
        }
    }

    getEnergy() {
        const storage = this.creep.room.storage;
        if (storage) {
            if (this.creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(storage);
            }
            return;
        }
        const container = this.creep.room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        })[0];
        if (container) {
            if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(container);
            }
            return;
        }
        const spawn = this.creep.room.find(FIND_MY_SPAWNS)[0];
        if (this.creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(spawn);
        }
    }
}

module.exports = Upgrader;