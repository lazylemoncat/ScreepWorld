function extensionPlanner(room, level) {
    const extensionMax = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level];
    const extensions = room.find(FIND_MY_STRUCTURES, {
        filter: structure => structure.structureType == STRUCTURE_EXTENSION
    });
    setSourceExtension(room, extensionMax - extensions.length);
}

function setSourceExtension(room, extensionSiteNum) {
    const sources = room.find(FIND_SOURCES);
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const direction = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
    for (const source of sources) {
        const ret = PathFinder.search(spawn.pos, {pos: source.pos, range: 1}).path;
        const length = ret.length;
        const pos = ret[length - 1];
        const posBack = ret[length - 2];
        let resPos = [];
        for (let i = 0; i < direction.length; i++) {
            const x = pos.x + direction[i][0];
            const y = pos.y + direction[i][1];
            const posNext = new RoomPosition(x, y, pos.roomName);
            if (posNext.x == posBack.x && posNext.y == posBack.y) {
                continue;
            }
            if (posNext.lookFor(LOOK_TERRAIN) != 'wall') {
                resPos.push(posNext);
            }
        }
        for (let i = 0; i < resPos.length; i++) {
            if (extensionSiteNum == 0) {
                break;
            }
            if (i == 0) {
                continue;
            }
            const pos = resPos[i];
            if (room.createConstructionSite(pos, STRUCTURE_EXTENSION) == OK) {
                extensionSiteNum--;
            }
        }
    }
}

module.exports = extensionPlanner;