const StructureFactory = require("structure_structureFactory");

function loopStructures(room) {
    for (const structure of room.find(FIND_MY_STRUCTURES)) {
        const structureInstance = StructureFactory.createStructure(structure, structure.structureType);
        if (structureInstance != null) {
            structureInstance.loop(structureInstance);
        }
    }
}

module.exports = loopStructures;