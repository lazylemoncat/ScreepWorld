class Structure {
    constructor(structure) {
        this.structure = structure;
    }

    loop() {
        throw new Error("Abstract method");
    }
}

module.exports = Structure;