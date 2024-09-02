const Tower = require("structure_tower");

function loopStructures(room) {
    const towers = room.find(FIND_MY_STRUCTURES, {
        filter: structure => structure.structureType == STRUCTURE_TOWER
    });
    towers.forEach(tower => {
        new Tower(tower).loop();
    });
}

module.exports = loopStructures;