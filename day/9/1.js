const input = require('./input');

function findInvalidXMASNumber(numbers, preamble){
    for (let i = preamble; i < numbers.length; i++){
        let pairFound = false;

        for (let j = i - preamble; j < i - 1; j++){
            for (let k = j + 1; k < i; k++){
                if (numbers[j] != numbers[k]){
                    if( testAddends(numbers[i], numbers[j], numbers[k])){
                        pairFound = true;
                        break;
                    }
                }
            }
            if (pairFound){ break; }
        }

        if (!pairFound) { return numbers[i]; }
    }
    return false;
}

function testAddends(sum, a1, a2){
    if (isAddendSumMatch(sum, a1, a2) && isAddendLengthMatch(sum, a1, a2)){ //Improves performance by pre-checking even/odd-ness and addend length
        return recursiveTestAddends(sum, a1, a2, 1); //Improves performance by checking the leftmost digits first, like humans would do
    }
    return false;
}

function recursiveTestAddends(sum, a1, a2, digits){
    if (digits >= sum.toString().length && a1 + a2 === sum){ return true; } //We've checked the entire values and they sum properly

    /* Example: 1001, 999, 2 - This offset makes sure our first recursive test is 100 + 99 + 2 */
    const a1Offset = sum.toString().length - a1.toString().length;
    const a2Offset = sum.toString().length - a2.toString().length;
    const maxOffset = Math.max(a1Offset, a2Offset);

    if (digits === 1){ digits += maxOffset; }

    const sumSlice = parseInt(sum.toString().slice(0, digits + maxOffset));
    const a1Slice = parseInt(a1.toString().slice(0, digits + (maxOffset - a1Offset)));
    const a2Slice = parseInt(a2.toString().slice(0, digits + (maxOffset - a2Offset)));

    if (a1Slice + a2Slice != sumSlice && a1Slice + a2Slice != sumSlice - 1){
        return false; //Not worth continuing to try and sum
    }else{
        return recursiveTestAddends(sum, a1, a2, ++digits); //The slices added up as we'd expect, worth continuting to test
    }
}

function isAddendLengthMatch(sum, a1, a2){
    const a1Length = a1.toString().length;
    const a2Length = a2.toString().length;
    const sumLength = sum.toString().length;
    if ((a1Length > sumLength || a2Length > sumLength) || (a1Length < sumLength - 1 && a2Length < sumLength - 1)){
        return false;
    }
    return true;
}

function isAddendSumMatch(sum, a1, a2){
    const sumEven = isEven(sum);
    if (isEven(a1) != isEven(a2)){
        return !sumEven;
    }
    return sumEven;
}

function isEven(n){
    const str = n.toString();
    const test = parseInt(str[str.length - 1]);
    return parseInt(test) % 2 === 0;
}

const numbers = input.full.split('\n').map(n => parseInt(n));

const result = findInvalidXMASNumber(numbers, 25);

console.log(result);
