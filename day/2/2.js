const input = require('./input');

function formatInput(input){
    const processedInput = [];

    input.forEach((line, i) => {
        //Example: '1-3 a: abcde'
        const a = line.split(': ');
        const b = a[0].split(' ');
        const bounds = b[0].split('-');

        processedInput.push({
            'pass': a[1],
            'rules': [
                {
                    'letter': b[1],
                    'indices': [parseInt(bounds[0]) - 1, parseInt(bounds[1]) - 1]
                }
            ]
        });
    });

    return processedInput;
}

function validatePasswords(input){
    let validCount = 0;
    input.forEach((line, i) => {
        line.rules.forEach((rule, j) => {
            const inFirstPos = line.pass[rule.indices[0]] === rule.letter;
            const inSecondPos = line.pass[rule.indices[1]] === rule.letter;
            if ( (inFirstPos && !inSecondPos) || (!inFirstPos && inSecondPos)){
                ++validCount;
            }
        });
    });
    return validCount;
}

function passwordToMap(password){
    const map = {};
    for (const letter of password){
        if (map[letter] === undefined){
            map[letter] = 1;
        }else{
            map[letter] += 1;
        }
    }
    return map;
}

const formattedInput = formatInput(input.full);

const result = validatePasswords(formattedInput);

console.log(result);
