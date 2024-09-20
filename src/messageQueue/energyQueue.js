class EnergyQueue {
    constructor() {
        this.queue = [];
    }

    send(type, id, amount) {
        const index = this.include(id);
        if (index !== -1) {
            this.queue[index].amount = amount;
            return;
        }
        this.insertMessage(type, id, amount);
    }

    receive(type, amount) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].type === type) {
                if (this.checkMessage(type, i)) {
                    i--;
                    continue;
                }
                return this.getMessage(i, amount);
            }
        }
        return undefined;
    }

    include(id) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    insertMessage(type, id, amount) {
        const message = {
            type: type,
            id: id,
            amount: amount
        };
        this.queue.push(message);
    }

    checkMessage(type, index) {
        const target = Game.getObjectById(this.queue[index].id);
        if (target == undefined) {
            this.queue.splice(index, 1)[0];
            return true;
        }
        if (type == "transfer") {
            if (target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                this.queue.splice(index, 1)[0];
                return true;
            }
            return false;
        }
        if (type == "withdraw") {
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                this.queue.splice(index, 1)[0];
                return true;
            }
            return false;
        }
        return false;
    }

    getMessage(index, amount) {
        let result = null;
        if (this.queue[index].amount <= amount) {
            result = this.queue.splice(index, 1)[0];
        } else {
            result = this.queue[index];
            this.queue[index].amount -= amount;
        }
        return result;
    }

    getSizeByType(type) {
        let count = 0;
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].type === type) {
                count++;
            }
        }
        return count;
    }
}

let energyQueue = new EnergyQueue();

module.exports = energyQueue;