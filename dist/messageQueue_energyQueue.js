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

    getMessage(index, amount) {
        let result = null;
        if (this.queue[index].amount <= amount) {
            result = this.queue.splice(index, 1)[0];
        } else {
            result = this.queue[index];
        }
        return result;
    }
}

let energyQueue = new EnergyQueue();

module.exports = energyQueue;