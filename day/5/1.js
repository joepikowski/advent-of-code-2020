const input = require('./input');

function calculateMaxID(passes){
    let max = 0;
    passes.forEach((pass, i) => {
        const seat = parseSeatString(pass);
        if (seat.id > max){ max = seat.id; }
    });
    return max;
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
        if ( arr[i] === lower){
            max -= ((max - min + 1) / 2);
        }else{
            min += ((max - min + 1) / 2);
        }
    }

    return arr[arr.length - 1] === lower ? min : max;
}

const passes = input.full.split('\n');

const result = calculateMaxID(passes);

console.log(result);
