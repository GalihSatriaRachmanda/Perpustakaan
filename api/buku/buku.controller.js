const{
    serviceAddBuku,
    serviceUpdateBuku,
    serviceDeleteBuku,
    serviceGetBuku
} = require("./buku.service")
const {checkToken} = require("../../auth/token_validation")
const { verify } = require("jsonwebtoken")

module.exports = {
    controllerAddBuku: (req, res)=>{
        let body = req.body
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
                    const data_buku = {
                        judul: body.judul,
                        penulis : body.penulis,
                        penerbit: body.penerbit,
                        tahun : body.tahun,
                        stok: body.stok,
                    }
                    serviceAddBuku(data_buku, (err, results)=>{
                        if(err){
                            console.log(err)
                            return res.json({
                                success: 0,
                                message: "not success input buku"
                            })
                        }else{
                            return res.json({
                                success: 1,
                                message: "succes input new buku",
                                data_buku
                            })
                        }
                    })
                }else{
                    res.json({
                        success: 0,
                        message: "Laman tidak tersedia"
                    })
                }
            })
        }
    },

    controllerUpdateBuku: (req, res)=>{
        let body = req.body
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else if (decoded.result1.status == "petugas"){
                    const data_buku = {
                        id_buku: body.id_buku,
                        judul: body.judul,
                        penulis : body.penulis,
                        penerbit: body.penerbit,
                        tahun : body.tahun,
                        stok: body.stok,
                    }
                    serviceUpdateBuku(data_buku, (err, results)=>{
                        if(err){
                            console.log(err)
                            return res.json({
                                success: 0,
                                message: "not success edit buku"
                            })
                            }else if(results.affectedRows > 0){
                                return res.json({
                                    success: 1,
                                    message: "succes edit buku",
                                    data_buku
                                })
                            }else{
                                return res.json({
                                    success: 0,
                                    message: "Gagal edit buku",
                                })
                        }
                    })
                }else{
                    res.json({
                        success: 0,
                        message: "Laman tidak tersedia"
                    })
                }
            })
        }
    },

    controllerDeleteBuku: (req, res)=>{
        let body = req.body
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
                    const data_buku = {
                        id_buku: body.id_buku,
                    }
                    serviceDeleteBuku(data_buku, (err, results)=>{
                        if(err){
                            console.log(err)
                            return res.json({
                                success: 0,
                                message: "not success update buku"
                            })
                        }else if(results.affectedRows > 0){
                            return res.json({
                                success: 1,
                                message: "succes Delete buku",
                                data: results
                            })
                        }
                    })
                }
            })
        }
    },

    controllerGetBuku: function(req, res){
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else{
                    serviceGetBuku(function(err, result){
                        if(err){
                            console.log(err)
                            return
                        }else{
                            return res.json({
                              success: result.length,
                              data: result
                            })
                        }
                    })
                }
            })
        }
    },

}