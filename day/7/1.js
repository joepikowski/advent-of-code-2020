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

function countAllContainersFor(sought){
    const containers = [];
    let valids = [ sought ];

    for ( [color, contents] of Object.entries(bags)){
        const path = getContainerPathForValids(valids, color);
        if (path.length > 0){
            path.forEach((c) => {
                if (valids.indexOf(c) === -1){ valids.push(c); }
            })
            containers.push(color);
        }
    }

    return containers.length;
}

function getContainerPathForValids(valids, color){
    let path = [];

    bags[color].forEach( (content) => {
        if (content === false){ return []; }
        const contentColor = Object.keys(content)[0];

        if (valids.indexOf(contentColor) > -1){
            path.push(contentColor);
        }else{
            const recursiveResults = getContainerPathForValids(valids, contentColor);

            if (recursiveResults.length > 0) { path = path.concat(contentColor, recursiveResults); }
        }
    });

    return path;
}

const bags = parseInputToBags(input.full);

const result = countAllContainersFor('shiny gold');

console.log(result);
