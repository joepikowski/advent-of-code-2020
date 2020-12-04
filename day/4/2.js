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

        requiredFields.forEach((field, j) => {;
            if ( passport[field] === undefined || !isValidValue(field, passport[field])){ isValid = false; }
        })

        if (isValid) { ++validCount; }
    });

    return validCount;
}

function isValidValue(field, value){

    const validators = {
        'byr': (v) => { return 1920 <= parseInt(v) && parseInt(v) <= 2002 },
        'iyr': (v) => { return 2010 <= parseInt(v) && parseInt(v) <= 2020 },
        'eyr': (v) => { return 2020 <= parseInt(v) && parseInt(v) <= 2030 },
        'hgt': (v) => { return v.match(/^(1[5-8][0-9]|19[0-3])cm$/) != null || v.match(/^(59|6[0-9]|7[0-6])in$/) != null; },
        'hcl': (v) => { return v.match(/^#[0-9,a-f]{6}$/) != null; },
        'ecl': (v) => { return ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(v) > -1; },
        'pid': (v) => { return v.match(/^[0-9]{9}$/) != null; }
    }

    return validators[field](value);
}

const passports = convertToPassports(input.full);

const results = validatePassports(passports);

console.log(results);
