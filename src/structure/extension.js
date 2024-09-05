const Structure = require('structure_structure');

class Extension extends Structure {
    constructor(structure) {
        super(structure);
    }

    loop() {
        this.checkEnergy();
    }
}

module.exports = Extension;