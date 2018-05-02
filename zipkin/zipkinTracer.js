const { Tracer, BatchRecorder,ConsoleRecorder, ExplicitContext } = require('zipkin');
const { HttpLogger } = require('zipkin-transport-http');
const CLSContext = require('zipkin-context-cls');

const ctxImpl = new CLSContext();

const recorder = new BatchRecorder({
    logger: new HttpLogger({
        endpoint: 'http://localhost:9411/api/v1/spans'
    })
});

const ZipkinTracer = new Tracer({ ctxImpl, recorder});

module.exports = ZipkinTracer;