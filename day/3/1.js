const input = require('./input');

function inputToMap(input){
    const rows = input.split('\n');
    const grid = rows.map(row => row.split(''));
    return grid;
}

function calculateTrees(map, dropY, runX){
    let treeCount = 0;
    const endX = map[0].length;
    const endY = map.length;

    for (let x = 0, y = 0; y < endY; x += runX, y += dropY) {

        let mY = y % endY;
        let mX = x % endX;

        if (map[mY][mX] === '#'){ ++treeCount; }
    }

    return treeCount;
}

const map = inputToMap(input.full);

const result = calculateTrees(map, 1, 3);

console.log(result);
