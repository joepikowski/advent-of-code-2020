const input = require('./input');

function convertToPassports(input){
    const passports = [];

    let rawPassports = input.split('\n\n');
    rawPassports = rawPassports.map(p => p.replace(/\n/g,' '));

    rawPassports.forEach((rawPassport, i) => {
        const formattedPassport = {};
        let rawPassportArray = rawPassport.split(' ');
        //Example: ['ecl:gry','pid:860033327','eyr:2020','hcl:#fffffd','byr:1937','iyr:2017','cid:147','hgt:183cm']
        rawPassportArray.forEach((kv, j) => {
            const [key, value] = kv.split(':');
            formattedPassport[key] = value;
        })
        passports.push(formattedPassport);
    });

    return passports;
}

function validatePassports(passports){
    let validCount = 0;
    const requiredFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

    passports.forEach((passport, i) => {
        let isValid = true;

        requiredFields.forEach((field, j) => {
            if (passport[field] === undefined){ isValid = false; }
        })

        if (isValid) { ++validCount; }
    });

    return validCount;
}

const passports = convertToPassports(input.full);

const results = validatePassports(passports);

console.log(results);
