const input = require('./input');

function findThreeAddendsForSum(sum, unsortedList){

    const list = unsortedList.sort( (a,b) => { return a - b; });

    for (let left = 0; left < list.length - 1; left++ ){

        const neededRemainingSum = sum - list[left];

        const newArray = list.slice(0, left).concat(list.slice(left + 1));

        const productOfTwoAddends = findTwoAddendsForSum(neededRemainingSum, newArray);

        if (productOfTwoAddends != false){
            return list[left] * productOfTwoAddends;
        }
    }

    return false;
}

function findTwoAddendsForSum(sum, list){

    let right = list.length - 1;

    for (let left = 0; left < list.length - 1; left++ ){

        const neededPair = sum - list[left];

        while ( right > left){
            if (list[right] === neededPair){
                return list[left] * list[right];
            }else if (list[right] < neededPair){
                break;
            }
            --right;
        }

    }

    return false;
}

const result = findThreeAddendsForSum(2020, input.full);

console.log(`Result: ${result}`);
