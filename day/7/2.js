const input = require('./input');

function parseInputToBags(input){
    const bags = {};
    const rules = input.split('\n');

    for (const rule of rules){
        const ruleSplit = rule.split(' contain ');
        const container = ruleSplit[0].split(' ');
        const contents = ruleSplit[1].split(', ');

        const contentsParsed = contents.map((content, i) => {
            if (content === 'no other bags.'){ return false; }
            const contentSplit = content.split(' ');
            const parsed = {};
            parsed[`${contentSplit[1]} ${contentSplit[2]}`] = parseInt(contentSplit[0]);
            return parsed;
        });

        bags[`${container[0]} ${container[1]}`] = contentsParsed;
    }

    return bags;
}

function countAllBagsIn(topContainer, multiplier = 1){
    let count = 0;

    bags[topContainer].forEach( (content) => {
        const contentColor = Object.keys(content)[0];

        if (content != false){
            count += content[contentColor] * multiplier;
            count += countAllBagsIn(contentColor, content[contentColor] * multiplier);
        }
    });

    return count;
}

const bags = parseInputToBags(input.full);

const result = countAllBagsIn('shiny gold');

console.log(result);
