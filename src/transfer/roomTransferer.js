const Transferer = require("transfer_transferer");
const EnergyQueue = require("messageQueue_energyQueue");

class RoomTransferer extends Transferer {
    constructor(creep) {
        super(creep);
    }

    goTransfer() {
        const target = this.getTransferTarget();
        if (target instanceof Structure && target.structureType == STRUCTURE_STORAGE) {
            if (EnergyQueue.getSizeByType("transfer") > 1) {
                this.creep.memory.energyTarget = undefined;
                return;
            }
        }
        if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    getTransferTarget() {
        let target;
        if (this.checkEnergyTarget()) {
            target = Game.getObjectById(this.creep.memory.energyTarget);
        }else if (this.getTarget() != undefined) {
            const targetObject = this.getTarget();
            if (targetObject != undefined) {
                target = Game.getObjectById(targetObject.id);
            }
        } else {
            const storage = this.creep.room.storage;
            if (storage == undefined) {
                return undefined;
            }
            target = storage;
        }
        return target;
    }

    getResource() {
        const target = this.getWithdrawTarget();
        if (this.goWithdrawTarget(target)) {
            return;
        }
        
        if (this.withdrawContainer()) {
            return;
        }
        if (this.withdrawStorage()) {
            return;
        }
        return;
    }

    withdrawStorage() {
        const storage = this.creep.room.storage;
        if (storage == undefined) {
            return false;
        }
        if (this.creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(storage);
        }
        return true;
    }

    withdrawContainer() {
        const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= this.creep.store.getFreeCapacity()
        });
        if (container == undefined) {
            return false;
        }
        if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(container);
        }
        return true;
    }

    getWithdrawTarget() {
        if (this.creep.memory.withdrawEnergyTarget != undefined) {
            const target = Game.getObjectById(this.creep.memory.withdrawEnergyTarget);
            if (target == undefined || target.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                this.creep.memory.withdrawEnergyTarget = undefined;
            } else {
                return target;
            }
        }
        let target = EnergyQueue.receive("withdraw", this.creep.store.getFreeCapacity());
        if (target == undefined) {
            return undefined;
        }
        this.creep.memory.withdrawEnergyTarget = target.id;
        return target;
    }

    goWithdrawTarget(target) {
        if (target == undefined) {
            return false;
        }
        if (target instanceof Creep) {
            if (target.store[RESOURCE_ENERGY] != target.store.getCapacity(RESOURCE_ENERGY)) {
                this.creep.memory.withdrawEnergyTarget = undefined;
                return false;
            }
            if (target.transfer(this.creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target);
                return true;
            }
        }
        return false;
    }
}

module.exports = RoomTransferer;