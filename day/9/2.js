const input = require('./input');

function findContiguousSum(sum, numbers){
    let runningSum = 0;
    let i = 0;
    let j = 0;

    while (runningSum != sum && i < numbers.length){
        if (numbers[j] > sum){
            i = j + 1;
            j = i;
            runningSum = 0;
        }
        if (runningSum > sum){
            runningSum -= numbers[i];
            i++;
            continue;
        }
        runningSum += numbers[j];
        j++;
    }

    if (runningSum === sum){
        const sequence = numbers.slice(i, j - 1);
        return Math.max(...sequence) + Math.min(...sequence)
    }

    return false;
}

const numbers = input.full.split('\n').map(n => parseInt(n));

const result = findContiguousSum(466456641, numbers);

console.log(result);
