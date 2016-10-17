#!/usr/bin/env node
let spawn = require('cross-spawn');
let script = process.argv[2];
let args = process.argv.slice(3);

switch (script) {
case 'build':
case 'eject':
case 'start':
case 'test':
  let result = spawn.sync(
    'node',
    [require.resolve('../scripts/' + script)].concat(args),
    {stdio: 'inherit'}
  );
  process.exit(result.status);
  break;
default:
  console.log('Unknown script "' + script + '".');
  console.log('Perhaps you need to update gaudi-scripts?');
  break;
}
