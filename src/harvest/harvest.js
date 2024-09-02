const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');
const Room_harvester = require('harvest_room_harvester');

function harvest(room) {
    let harvesters = room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'harvester'});
    check_spawn(room, harvesters);
    for (let harvester of harvesters) {
        let room_harvester = new Room_harvester(harvester);
        room_harvester.loop(harvester);
    }
}

function check_spawn(room, harvesters) {
    if (harvesters.length >= room.find(FIND_SOURCES).length) {
        return;
    }
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyAvailable,
        bodyparts=[WORK, CARRY, MOVE],
    );
    const name = generateName('harvester');
    const sourceId = get_room_sourceId(room, harvesters);
    const memory = generateMemory({
        role: 'harvester',
        sourceId: sourceId,
    });
    createCreep(spawn, room, body, name, memory);
}

function get_room_sourceId(room, harvesters) {
    let sourceIds = [];
    for (let harvester of harvesters) {
        sourceIds.push(harvester.memory.sourceId);
    }
    const sources = room.find(FIND_SOURCES);
    for (let i = 0; i < sources.length; i++) {
        if (!sourceIds.includes(sources[i].id)) {
            return sources[i].id;
        }
    }
    return null;
}

module.exports = harvest;