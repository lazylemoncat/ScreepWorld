const Transferer = require("transfer_transferer");

class RoomTransferer extends Transferer {
    constructor(creep) {
        super(creep);
    }

    goTransfer() {
        const target = this.creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        if (target) {
            if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
            }
        }
    }

    getResource() {
        const target = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (this.creep.harvest(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }
}

module.exports = RoomTransferer;