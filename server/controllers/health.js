const circuit = require('../circuitBreaker');

module.exports = {
    ping: (req, res) => res.status(200).json({message: "hello i am alive"})
}