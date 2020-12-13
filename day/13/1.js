const input = require('./input');

function inputToTimeAndBuses(input){
    input = input.split('\n');
    return [parseInt(input[0]), input[1].split(',').filter(route => route != 'x').map(route => parseInt(route))]
}

function getEarliestBus(time, buses){
    let result = false;

    for (let i = time; !result; i++){
        for (const bus of buses){
            if (i % bus === 0){
                result = (i - time) * bus;
                break;
            }
        }
    }
    return result;
}

const [time, buses] = inputToTimeAndBuses(input.full);

const result = getEarliestBus(time, buses);

console.log(result);
