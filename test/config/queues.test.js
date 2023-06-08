const expect = require('chai').expect;
const queues = require('../../src/config/queues.js');

describe('Queue Config Tests', () => {
    it('should verify jobQueue queue was created', () => {
        const expectedName = 'jobQueue';
        const actualName = queues.jobQueue.name;

        expect(expectedName).to.equal(actualName);
    });
});
