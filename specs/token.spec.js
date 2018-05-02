const test = require('ava');
const sinon = require('sinon');
const jwt = require('jwt-simple');

let stub;

test.before(t => {
    stub = sinon.stub(jwt, 'encode').callsFake(() => {
        return Promise.resolve({success: 'Token is valid'});
    });
});

test('should return success', async t => {
    const testToken = 'test';
    const testSecret = 'test secret';
    
    const result = await jwt.encode({ sub: 'hello', iat: 'aasasd' }, testSecret);
    console.log(result);
    t.is(result.success, 'Token is valid');
});

test.after('cleanup', t => {
    stub.restore();
});