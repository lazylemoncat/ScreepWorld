const structure = require("structure_structure");

class Spawn extends structure {
    constructor(spawn) {
        super(spawn);
    }

    loop() {
        this.checkEnergy();
    }
}

module.exports = Spawn;