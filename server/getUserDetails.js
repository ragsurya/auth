const circuit = require('./circuitBreaker');
const ZipkinTracer = require('../zipkin/zipkinTracer');
const fetch = require('node-fetch');
const wrapFetch = require('zipkin-instrumentation-fetch');
const zipkinFetch = wrapFetch(fetch, {
  tracer: ZipkinTracer,
  serviceName: 'SigninService calling'
});


/* WITH ZIPKIN FETCH & NO CIRCUIT BREAKER */
const GetUserDetails  =  (req, res) => {

  Promise.all([
    zipkinFetch(`http://localhost:5000/api/userdetails/${req.body.email}`),
]).then(([first]) => {
 return Promise.all([
     first.text(),
 ]);
}).then(([first])=> {
 res.send(JSON.parse(`${first}`));
 })
}
/* WITH ZIPKIN FETCH & CIRCUIT BREAKER */
// const GetUserDetails  =  (req, resp) => {
//      return circuit.fire({
//       endpoint: `http://localhost:5000/api/userdetails/${req.body.email}`,
//     })
//     .then((messages) => {
//         if(messages.body === undefined){
//           resp.send(messages)
//         }
//         else{
//           resp.send(JSON.parse(messages.body))
//         }
//       })
//     .catch((err) => resp.send(err))
//     }

  module.exports = GetUserDetails;