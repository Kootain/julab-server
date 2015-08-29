var nexe = require('nexe');

nexe.compile({
    input: './server.js',
    output: 'bin',
    nodeVersion: '0.12.7',
    nodeTempDir: './tmp/nexe',
    python: '/usr/bin/python',
    flags: true,
    framework: "nodejs"
}, function(err) {
    console.log(err);
});