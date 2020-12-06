const input = require('./input');

function sumUnanimousAnswers(input){
    let sum = 0;
    let inputArray = input.split('\n\n');

    inputArray = inputArray.map(input => {
        const passengerCount = input.split('\n').length;
        let sanitized = input.replace(/\n/g,'').split('').sort().join('');
        let consecutive = 1;

        for (let i = 0; i < sanitized.length; i++){
            if (sanitized[i] === sanitized[i-1]){
                ++consecutive;
            }else{
                consecutive = 1;
            }
            if (consecutive === passengerCount){
                ++sum;
                consecutive = 1;
            }
        }
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

const result = sumUnanimousAnswers(input.full);

console.log(result);
