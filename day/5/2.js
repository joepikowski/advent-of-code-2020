const input = require('./input');

function calculateMissingID(passes){
    const ids = [];
    let missing;

    passes.forEach((pass, i) => {
        const seat = parseSeatString(pass);
        ids.push(seat.id);
    });

    ids.sort((a,b) => b - a);

    ids.forEach((id, i) => {
        if (i > 0 && ids[i-1] != id + 1){
            missing = ids[i-1] - 1;
        }
    });

    return missing;
}

function parseSeatString(seatString){
    const row = binarySearch(0,127,'F','B',seatString.slice(0,7));
    const col = binarySearch(0,7,'L','R',seatString.slice(7,10));
    return {
        row: row,
        col: col,
        id: (row * 8) + col
    };
}

function binarySearch(min, max, lower, higher, string){
    const arr = string.split('');

    for (let i = 0; i < arr.length - 1; i++){
        if (arr[i] === lower){
            max -= ((max - min + 1) / 2);
        }else{
            min += ((max - min + 1) / 2);
        }
    }

    return arr[arr.length - 1] === lower ? min : max;
}

const passes = input.full.split('\n');

const result = calculateMissingID(passes);

console.log(result);
