const input = require('./input');

function inputToAdapters(input){
    input = input.split('\n');
    input = input.map(j => parseInt(j));
    input = input.sort((a,b) => b-a);
    input = [ ...[input[0] + 3], ...input, ...[0] ];
    return input;
}

function getAllPossibleCombinations(adapters){;
    const validConnections = adapters.map((adapter, i) => { return getValidConnections(i, adapters); });

    const count = getPossibleCombinations(0, adapters, validConnections);

    return count;
}

function getPossibleCombinations(index, adapters, validConnections){
    if (cache[adapters[index]] != undefined){ return cache[adapters[index]]; }

    if (index === adapters.length - 1){ return 1; }

    let count = 0;

    validConnections[index].forEach((connection, j) => {
        count += getPossibleCombinations(index + j + 1, adapters, validConnections);
    });

    if (cache[adapters[index]] === undefined){ cache[adapters[index]] = count; }

    return count;
}

function getValidConnections(index, adapters){
    const connections = [];
    for (let i = index, tooLow = false; !tooLow; i++){
        if (adapters[i+1] >= (adapters[index] - 3)){
            connections.push(adapters[i+1]);
        }else{
            tooLow = true;
        }
    }
    return connections;
}

const adapters = inputToAdapters(input.full);

const cache = { '0': 1 };

const result = getAllPossibleCombinations(adapters);

console.log(result);
