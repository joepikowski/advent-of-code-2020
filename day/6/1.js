const input = require('./input');

function sumLengthOfDeduplicatedStrings(input){
    let sum = 0;
    let inputArray = input.split('\n\n');
    inputArray = inputArray.map(input => {
        let sanitized = input.replace(/\n/g,'');
        sum += deduplicateString(sanitized).length;
    });
    return sum;
}

function deduplicateString(str){
    let dd = '';
    const sorted = str.split('').sort();

    for (let i = 0; i < sorted.length; i++){
        if (sorted[i] != sorted[i+1] || i === sorted.length - 1){
            dd += sorted[i];
        }
    }

    return dd;
}

const result = sumLengthOfDeduplicatedStrings(input.full);

console.log(result);
