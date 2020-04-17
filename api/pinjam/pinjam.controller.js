const {
    addTransaksi,
    getTransaksi,
    getIdTransaksi,
    deleteTransaksi
} = require('./pinjam.service')
const { verify } = require("jsonwebtoken")

module.exports = {
    controllerAddTransaksi:(req,res)=>{
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else {
                    var now = new Date();
                    var jsonDate = now.toJSON();
                    var new_date = new Date(jsonDate);
                            
                    var lama_pinjam = req.body.lama_pinjam;
                    var kembali = new Date(now.getFullYear(), now.getMonth(), now.getDate()+lama_pinjam, 
                    now.getHours(),now.getMinutes(),now.getSeconds(),now.getTimezoneOffset());
                            
                    data_pinjam = {
                        id_anggota : req.body.id_anggota,
                        id_petugas : req.body.id_petugas,
                        id_buku : req.body.id_buku,
                        tgl_pinjam : new_date,
                        kembali : kembali
                    }
                    addTransaksi(data_pinjam,(err,results)=>{
                        if(err){
                            if(err === "buku404"){
                                return res.json({
                                    message: "Book Not Found"
                                })
                            }
                            if(err === "habis"){
                                return res.json({
                                    message: "Book All Over"
                                })
                            }
                            if(err === "anggota404"){
                                return res.json({
                                    message: "Anggota Not Found"
                                })
                            }
                            if(err === "petugas404"){
                                return res.json({
                                    message: "Petugas Not Found"
                                })
                            }
                            console.log(err)
                            return
                        }else{
                            return res.json({
                                success:1,
                                data:results
                            })
                        }
                    })
                }
            })
        }
    },

    controllerGetTransaksi:(req,res)=>{
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else {
                    getTransaksi((err,results)=>{
                        if(err){
                            console.log(err)
                            return
                        }else{
                            return res.json({
                                success:1,
                                data:results
                            })
                        }
                    })
                }
            })
        }
    },

    controllerGetIdTransaksi:(req,res)=>{
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else {
                const body = req.body.id_transaksi
                getIdTransaksi(body,(err,results)=>{
                    if(err){
                        console.log(err)
                        return
                    }else if(!results){
                        return res.json({
                            success:0,
                            message: "Transaksi Not Found",
                        })
                    }
                    else{
                        return res.json({
                            success:1,
                            data:results
                        })
                    }
                })
            }
        })
    }
},

    controllerDeleteTransaksi:(req,res)=>{
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else if(decoded.result1.status == "petugas"){
                    const body = req.body.id_transaksi
                    deleteTransaksi(body,(err,results)=>{
                        if(err){
                            console.log(err)
                            return
                        }else if(!results){
                            return res.json({
                                success:0,
                                message:"Not Found"
                            })
                        }else{
                            return res.json({
                                success:1,
                                message:"Delete Success"
                            })
                        }
                    })
                }
            })
        }
    }
}       