const circuitBreaker = require('opossum');
const client = require('roi');

const circuit = circuitBreaker(client.get);

circuit.fallback(() => Promise.resolve({
    error: "Service currently unavailable, please try again later"
}));

module.exports = circuit;

