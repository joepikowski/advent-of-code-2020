const input = require('./input');

function inputToInstructions(input){
    return input
        .split('\n')
        .map( inst => [inst[0], parseInt(inst.slice(1))] );
}

function getDistanceFromZeroAfter(instructions){
    let ship = {
        heading: 'E',
        x: 0,
        y: 0
    };

    instructions.forEach((instruction, i) => {
        ship = processInstruction(instruction[0], instruction[1], ship);
    });

    return Math.abs(ship['x']) + Math.abs(ship['y']);
}

function processInstruction(instruction, value, ship){
    const headings = ['N', 'E', 'S', 'W'];
    switch(instruction){
        case 'N':
            ship['y'] += value;
            break;
        case 'S':
            ship['y'] -= value;
            break;
        case 'E':
            ship['x'] += value;
            break;
        case 'W':
            ship['x'] -= value;
            break;
        case 'L':
            ship['heading'] = headings[ (headings.indexOf(ship.heading) + (3 *(value / 90))) % 4 ];
            break;
        case 'R':
            ship['heading'] = headings[ (headings.indexOf(ship.heading) + (value / 90)) % 4 ];
            break;
        case 'F':
            ship = processInstruction(ship.heading, value, ship);
            break;
    }

    return ship;
}

const instructions = inputToInstructions(input.full);

const result = getDistanceFromZeroAfter(instructions);

console.log(result);
