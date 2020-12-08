const input = require('./input');

function convertInputToOpcode(input){
    input = input.split('\n');
    input = input.map(op => {
        const split = op.split(' ');
        return [split[0], parseInt(split[1])];
    });
    return input;
}

function getAccumulatorBeforeRepeat(opcode){
    let accumulator = 0;
    let step = 0;

    const stepsExecuted = [];

    while (stepsExecuted.indexOf(step) === -1){
        stepsExecuted.push(step);
        [accumulator, step] = runNextOpcodeStep(opcode, accumulator, step);
    }

    return accumulator;
}

function runNextOpcodeStep(opcode, accumulator, step){
    switch (opcode[step][0]){
        case 'acc':
            accumulator += opcode[step][1];
            ++step;
            break;
        case 'jmp':
            step += opcode[step][1];
            break;
        case 'nop':
            ++step;
            break;
    }
    return [accumulator, step];
}

const opcode = convertInputToOpcode(input.full);

const result = getAccumulatorBeforeRepeat(opcode);

console.log(result);
