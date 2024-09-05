const Extension = require("structure_extension");
const Tower = require("structure_tower");
const Spawn = require("structure_spawn");

class StructureFactory {
    constructor() {}

    createStructure(structure, type) {
        let instance = null;
        switch (type) {
            case STRUCTURE_EXTENSION: {
                instance = new Extension(structure);
                break;
            }
            case STRUCTURE_TOWER: {
                instance = new Tower(structure);
                break;
            }
            case STRUCTURE_SPAWN: {
                instance = new Spawn(structure);
                break;
            }
        }
        return instance;
    }
}

const structureFactory = new StructureFactory();

module.exports = structureFactory;