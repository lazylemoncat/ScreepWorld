const Transferer = require("transfer_transferer");

class RoomTransferer extends Transferer {
    constructor(creep) {
        super(creep);
    }

    goTransfer() {
        let target;
        if (this.checkEnergyTarget()) {
            target = Game.getObjectById(this.creep.memory.energyTarget);
        }else {
            const targetObject = this.getTarget();
            if (targetObject == undefined) {
                return;
            }
            target = Game.getObjectById(targetObject.id);
        }
        if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    getResource() {
         const container = this.creep.room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= this.creep.store.getFreeCapacity()
        })[0];
        if (container == undefined) {
            return;
        }
        if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(container);
        }
        return;
    }
}

module.exports = RoomTransferer;