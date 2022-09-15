require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var siswaRouter = require('./routes/siswa');
var ortuRouter = require('./routes/ortu');
var jurusanRouter = require('./routes/jurusan');
var kelasRouter = require('./routes/kelas');
var mapelRouter = require('./routes/mapel');
var mapelJurusanRouter = require('./routes/mapelJurusan');
var nilaiAkhirRouter = require('./routes/nilaiAkhir');
var raportRouter = require('./routes/raport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/siswa', siswaRouter);
app.use('/ortu', ortuRouter);
app.use('/jurusan', jurusanRouter);
app.use('/kelas', kelasRouter);
app.use('/mapel', mapelRouter);
app.use('/mapel-jurusan', mapelJurusanRouter);
app.use('/nilai-akhir', nilaiAkhirRouter);
app.use('/raport', raportRouter);

module.exports = app;

