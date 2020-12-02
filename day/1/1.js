const input = require('./input');

function findTwoAddendsForSum(sum, list){

    const sortedList = list.sort( (a,b) => { return a - b; });

    let right = sortedList.length - 1;

    for (let left = 0; left < sortedList.length - 1; left++ ){

        const neededPair = sum - sortedList[left];

        while ( right > left){
            if (sortedList[right] === neededPair){
                return sortedList[left] * sortedList[right];
            }else if (sortedList[right] < neededPair){
                break;
            }
            --right;
        }

    }
}

const result = findTwoAddendsForSum(2020, input.full);

console.log(`Result: ${result}`);
