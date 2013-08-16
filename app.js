var express = require('express');
var load = require('express-load');
var app = express();
var _dir = __dirname;
var jf = require('jsonfile');
var config = jf.readFileSync('config/config.default.json');

app.use(express['static'](_dir + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
	secret: 'jbcms.org',
	cookie: {
		path: '*'
	}
}));

load('apis').then('controllers').then('routes').into(app);

app.listen(config.port);
console.log("%s running on %s port", config.host, config.port);
