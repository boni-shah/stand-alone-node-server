var express = require('express');
var path = require('path');

var routes = require('./server/routes/index');
var readers = require('./server/routes/readers');
var books = require('./server/routes/books');
var errors = require('./server/routes/errors');

var app = express();
app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/', routes);
app.use('/api/readers', readers);
app.use('/api/books', books);
app.use('/api/errors', errors);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: app.get('env') === 'development' ? err : {} // development error handler will print stacktrace
        });
    });

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));

module.exports = app;