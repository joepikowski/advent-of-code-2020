const input = require('./input');

function tallyDifferentials(adapters){
    const tally = {};

    adapters = adapters.split('\n');
    adapters = adapters.map(j => parseInt(j));
    adapters = adapters.sort((a,b) => a-b);

    adapters = [ ...[0], ...adapters, ...[adapters[adapters.length -1 ] + 3]]

    adapters.forEach((adapter,i) => {
        if (i != adapters.length - 1){
            const diff = adapters[i+1] - adapter;
            if(tally[diff] != undefined){
                tally[diff] += 1;
            }else{
                tally[diff] = 1;
            }
        }
    });

    return tally;
}

const result = tallyDifferentials(input.full);

console.log(result[1] * result[3]);
