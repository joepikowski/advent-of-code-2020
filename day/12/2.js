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

    let waypoint = {
        x: 10,
        y: 1
    };

    instructions.forEach((instruction, i) => {
        [ship, waypoint] = processInstruction(instruction[0], instruction[1], ship, waypoint);
    });

    return Math.abs(ship['x']) + Math.abs(ship['y']);
}

function processInstruction(instruction, value, ship, waypoint){
    const headings = ['N', 'E', 'S', 'W'];
    switch(instruction){
        case 'N':
            waypoint['y'] += value;
            break;
        case 'S':
            waypoint['y'] -= value;
            break;
        case 'E':
            waypoint['x'] += value;
            break;
        case 'W':
            waypoint['x'] -= value;
            break;
        case 'L':
            waypoint = turn('L', value, waypoint, ship);
            break;
        case 'R':
            waypoint = turn('R', value, waypoint, ship);
            break;
        case 'F':
            ship['x'] += waypoint['x'] * value;
            ship['y'] += waypoint['y'] * value;
            break;
    }

    return [ship, waypoint];
}

function turn(direction, degrees, waypoint, ship){
    while(degrees > 0){
        if (direction === 'L'){
            waypoint = turnLeft90(waypoint);
        }else{
            waypoint = turnRight90(waypoint);
        }
        degrees -= 90;
    }

    return waypoint;
}

function turnLeft90(waypoint){
    return {
        x: -waypoint['y'],
        y: waypoint['x']
    };
}

function turnRight90(waypoint){
    return {
        x: waypoint['y'],
        y: -waypoint['x']
    };
}

const instructions = inputToInstructions(input.full);

const result = getDistanceFromZeroAfter(instructions);

console.log(result);
