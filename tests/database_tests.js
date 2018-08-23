const test = require('tape');

test('--------database_tests.js-------tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.equal(process.env.NODE_ENV, 'test', 'the process.env.NODE_env enviroment should be test');
  t.end();
});
