require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var siswaRouter = require("./routes/siswa");
var ortuRouter = require("./routes/ortu");
var jurusanRouter = require("./routes/jurusan");
var kelasRouter = require("./routes/kelas");
var mapelRouter = require("./routes/mapel");
var mapelJurusanRouter = require("./routes/mapelJurusan");
var raportRouter = require("./routes/raport");
var nilaiMapelRouter = require("./routes/nilaiMapel");
var mutasiRouter = require("./routes/mutasi");
var dashboardRouter = require("./routes/dashboard");
var historyRouter = require("./routes/history");
var functionProcedureRouter = require("./routes/functionProcedure");
// var nilaiAkhirRouter = require('./routes/nilaiAkhir');

var app = express();

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route
// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/siswa", siswaRouter);
app.use("/ortu", ortuRouter);
app.use("/jurusan", jurusanRouter);
app.use("/kelas", kelasRouter);
app.use("/mapel", mapelRouter);
app.use("/mapel-jurusan", mapelJurusanRouter);
app.use("/raport", raportRouter);
app.use("/nilai-mapel", nilaiMapelRouter);
app.use("/mutasi", mutasiRouter);
app.use("/dashboard", dashboardRouter);
app.use("/history", historyRouter);
app.use("/dbquery", functionProcedureRouter);
// app.use('/nilai-akhir', nilaiAkhirRouter);

module.exports = app;
