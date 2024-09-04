const Extension = require("structure_extension");
const Tower = require("structure_tower");

class StructureFactory {
    constructor() {}

    createStructure(structure, type) {
        let instance = null;
        if (type === STRUCTURE_EXTENSION) {
            instance = new Extension(structure);
        } else if (type === STRUCTURE_TOWER) {
            this.structure = new Tower(structure);
        }
        return instance;
    }
}

const structureFactory = new StructureFactory();

module.exports = structureFactory;