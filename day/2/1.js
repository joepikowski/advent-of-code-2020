const input = require('./input');

function formatInput(input){
    const processedInput = [];

    input.forEach((line, i) => {
        // Example: '1-3 a: abcde'
        const a = line.split(': ');
        const b = a[0].split(' ');
        const bounds = b[0].split('-');

        processedInput.push({
            'pass': a[1],
            'rules': [
                {
                    'letter': b[1],
                    'min': parseInt(bounds[0]),
                    'max': parseInt(bounds[1])
                }
            ]
        });
    });

    return processedInput;
}

function validatePasswords(input){
    let validCount = 0;
    input.forEach((line, i) => {

        const map = passwordToMap(line.pass);

        line.rules.forEach((rule, j) => {
            if (map[rule['letter']] != undefined
                    && map[rule['letter']] >= rule['min']
                    && map[rule['letter']] <= rule['max']
            ){
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
