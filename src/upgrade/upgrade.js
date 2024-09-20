const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');
const Upgrader = require('upgrade_upgrader');

function upgrade(room) {
    if (!checkUpgradStatus(room)) {
        return;
    }
    let upgraders = room.find(FIND_MY_CREEPS, {filter: 
        creep => creep.memory.role == 'upgrader'
    });
    checkSpawn(room, upgraders);
    for (const upgrader of upgraders) {
        const upgraderObject = new Upgrader(upgrader);
        upgraderObject.loop();
    }
}

function checkUpgradStatus(room) {
    const site = room.find(FIND_MY_CONSTRUCTION_SITES);
    if (site.length > 0) {
        return false;
    }
    return true;
}

function checkSpawn(room, upgraders) {
    if (upgraders.length >= 3) {
        return;
    }
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

module.exports = upgrade;