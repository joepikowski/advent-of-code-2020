const input = require('./input');

function convertInputToOpcode(input){
    input = input.split('\n');
    input = input.map(op => {
        const split = op.split(' ');
        return [split[0], parseInt(split[1])];
    });
    return input;
}

function staticallyAnalyzeForExit(opcode){
    const exits = [];
    opcode.forEach((op, i) => {
        if (op[0] === 'jmp' && (i + op[1]) >= opcode.length - 5){
            exits.push(`jmp Step ${i} would terminate program.`);
            // Then, manually convert jmp instruction before it to nop.
        }
    });
    return exits;
}

function getAccumulator(opcode){
    let accumulator = 0;
    let step = 0;

    while (step < opcode.length){
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

const opcodeOriginal = convertInputToOpcode(input.full);

const analysis = staticallyAnalyzeForExit(opcodeOriginal);

console.log(analysis);

const opcode = convertInputToOpcode(input.modified);

const result = getAccumulator(opcode);

console.log(result);
