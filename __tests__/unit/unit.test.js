// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2
test('isPhoneNumber true1 valid number',()=>{
    expect(functions.isPhoneNumber('123-456-7890')).toBe(true);
});

test('isPhoneNumber true2 valid number',()=>{
    expect(functions.isPhoneNumber('111-222-3333')).toBe(true);
});

test('isPhoneNumber false1 with non-number symbols',()=>{
    expect(functions.isPhoneNumber('111-abc-1234')).toBe(false);
});

test('isPhoneNumber false2 no -',()=>{
    expect(functions.isPhoneNumber('1112223333')).toBe(false);
});

test('isEmail true1 valid email all letters',()=>{
    expect(functions.isEmail('jingxin@gmail.com')).toBe(true);
});

test('isEmail true2 valid email with number',()=>{
    expect(functions.isEmail('123456@outlook.com')).toBe(true);
});

test('isEmail false1 no @',()=>{
    expect(functions.isEmail('jingxingmail.com')).toBe(false);
});

test('isEmail false1 no .',()=>{
    expect(functions.isEmail('jingxin@gmailcom')).toBe(false);
});

test('isStrongPassword true1 valid strong passward',()=>{
    expect(functions.isStrongPassword('abcdefgh')).toBe(true);
});

test('isStrongPassword true2 valid with numbers and _ ',()=>{
    expect(functions.isStrongPassword('abcd_1234')).toBe(true);
});

test('isStrongPassword false1 less than 4 length ',()=>{
    expect(functions.isStrongPassword('abc')).toBe(false);
});

test('isStrongPassword false2 first character number ',()=>{
    expect(functions.isStrongPassword('1abcefg')).toBe(false);
});

test('isDate true1 valid date 2 digits', ()=>{
    expect(functions.isDate('11/20/2022')).toBe(true);
});

test('isDate true2 valid date 1 digit', ()=>{
    expect(functions.isDate('1/2/2022')).toBe(true);
});

test('isDate false1 more than 2 digits', ()=>{
    expect(functions.isDate('123/20/2022')).toBe(false);
});

test('isDate false1 less than 4 digits', ()=>{
    expect(functions.isDate('12/20/20221')).toBe(false);
});

test('isHexColor true1 3 digit hex',()=>{
    expect(functions.isHexColor('AFA')).toBe(true);
});

test('isHexColor true2 6 digit hex',()=>{
    expect(functions.isHexColor('AAFFBB')).toBe(true);
});

test('isHexColor false1 5 digits',()=>{
    expect(functions.isHexColor('AAFBB')).toBe(false);
});

test('isHexColor false2 invalid characters',()=>{
    expect(functions.isHexColor('1-C')).toBe(false);
});