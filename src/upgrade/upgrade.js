const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function upgrade(room) {
    let upgrader = room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'upgrader'})[0];
    if (upgrader == undefined) {
        create_upgrader(room);
        return;
    }
    if (check_upgrading(upgrader)) {
        go_upgrade(upgrader);
    } else {
        go_get_energy(upgrader);
    }
}

function create_upgrader(room) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyAvailable,
        bodyparts=[WORK, CARRY, MOVE],
    );
    const name = generateName('upgrader');
    const memory = generateMemory({
        role: 'upgrader',
    });
    createCreep(spawn, room, body, name, memory);
}

function check_upgrading(upgrader) {
    if (upgrader.store.getFreeCapacity() == 0) {
        upgrader.memory.upgrading = true;
    } else if (upgrader.store.getUsedCapacity() == 0) {
        upgrader.memory.upgrading = false;
    }
    return upgrader.memory.upgrading;
}

function go_upgrade(upgrader) {
    if (upgrader.upgradeController(upgrader.room.controller) == ERR_NOT_IN_RANGE) {
        upgrader.moveTo(upgrader.room.controller);
    }
}

function go_get_energy(upgrader) {
    const spawn = upgrader.room.find(FIND_MY_SPAWNS)[0];
    if (upgrader.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        upgrader.moveTo(spawn);
    }
}

module.exports = upgrade;