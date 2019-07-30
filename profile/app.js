var express = require('express');
var http = require('http');
var path = require('path');

// middleware
var static = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

// config
var appConfig = require('./config/app_config');

// loader
var routes_loader = require('./routes/routes_loader');

var app = express();
app.set('port', appConfig.server_port || 3000);
app.set('viwes', __dirname + '/views');
app.set('view engie', appConfig.view_eigine);

// use middleware
app.use(static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// routes
routes_loader.init(app, express.Router());

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다.');
});