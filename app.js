require("dotenv").config();
const express = require('express')
const app = express();
const petugasRouter = require("./api/petugas/petugas.router")
const anggotaRouter = require("./api/anggota/anggota.router")
const pinjamRouter = require("./api/pinjam/pinjam.router")
const bukuRouter = require("./api/buku/buku.router")

app.use(express.json())
app.use("/api/petugas", petugasRouter)
app.use("/api/anggota", anggotaRouter)
app.use("/api/pinjam", pinjamRouter)
app.use("/api/buku", bukuRouter)


app.listen(process.env.APP_PORT, function(){
    console.log("running on port: "+process.env.APP_PORT)
})
