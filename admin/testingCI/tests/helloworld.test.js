const { default: expect } = require("expect");

describe('Test Hello World', () => {
    it('Test 1', () => {
        var text = document.querySelector('h1').innerHTML;
        expect(text).toBe('Hello world')
    });

    it('Test 2', () => {
        expect(5).toBeGreaterThan(3);
    });
  });