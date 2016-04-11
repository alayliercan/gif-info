var xhr = require('xhr');
var pick = require('lodash/pick');
var gifInfo = require('../');

var gifFiles = [
	{
		name: 'uneven-delay.gif',
		info: {
			valid: true,
			animated: true,
			loopCount: 0,
			width: 377,
			height: 500,
			duration: 2780
		}
	},
	{
		name: 'box.gif',
		info: {
			valid: true,
			animated: true,
			loopCount: 0,
			width: 180,
			height: 250,
			duration: 2800
		}
	}
];

gifFiles.forEach(function(testFile) {
	QUnit.test(testFile.name, function(assert) {
		var done = assert.async();

		var options = {
			url: 'gif/' + testFile.name,
			method: 'GET',
			responseType: 'arraybuffer'
		};

		xhr(options, function(err, response, buffer) {
			var info = new gifInfo(buffer);

			assert.deepEqual(pick(info, Object.keys(testFile.info)), testFile.info);

			done();
		});
	});
});