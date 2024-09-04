const Structure = require('structure_structure');

class Extension extends Structure {
    constructor(structure) {
        super(structure);
        this.energyRate = 1;
    }

    loop() {
        this.checkEnergy();
    }
}

module.exports = Extension;