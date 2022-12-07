const mathOperations = require('./calculator');

xdescribe("Calculator tests", () =>{
    test('adding 1 + 2 should return 3', () => {
        expect(mathOperations.sum(1,2)).toBe(3);
    });
})