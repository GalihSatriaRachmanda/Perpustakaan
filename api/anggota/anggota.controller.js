const{
    serviceAddAnggota,
    serviceUpdateAnggota,
    serviceGetAnggotaById,
    serviceDeleteAnggota,
    serviceGetAnggotaByEmail
} = require("./anggota.service")

const { genSaltSync, hashSync, compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { verify } = require("jsonwebtoken")

module.exports = {
    controllerAddAnggota: (req,res)=>{
        let body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        const data = {
            first_name: body.first_name,
            last_name: body.last_name,
            gender: body.gender,
            number : body.number,
            email: body.email,
            password : body.password
        }

        serviceAddAnggota(data, (err,result)=>{
            if(err){
                console.log(err)
                return res.json({
                    message: "not success input anggota"
                })
            }else{
                res.json({
                    data,
                    message: "Data berhasil ditambahkan"
                })
            }
        })
    },

    controllerUpdateAnggota: (req,res)=>{
        let body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login firts"
                    })
                }else{
                    var user = decoded.result1
                    const data = {
                        id_anggota: user.id_anggota,
                        first_name: body.first_name,
                        last_name: body.last_name,
                        gender: body.gender,
                        email: body.email,
                        password: body.password,
                        number: body.number
                    }
                
                    serviceUpdateAnggota(data, (err,result)=>{
                        if(err){
                            console.log(err)
                            return res.json({
                                message: "not success update anggota"
                            })
                        }else{
                            res.json({
                                data
                            })
                        }
                    })
                }
            })
        }
    },              

    controllerGetAnggotaById: function(req, res){
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login firts"
                    })
                }else{
                    var user = decoded.result1
                    const data_item = {
                        id_anggota: user.id_anggota,
                    }
                    serviceGetAnggotaById(data_item, function(err, result){
                        if(err){
                            console.log(err)
                            return
                        }
                        if(!result){
                            return res.json({
                            success: 0,
                            message: "record not found"
                        })
                        }else{
                            return res.json({
                                success: 1,
                                data: result
                            })
                        }
                    })
                }
            })
        }
    },

    controllerDeleteAnggota: function(req, res){
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login firts"
                    })
                }else{
                    var user = decoded.result1
                    const data_item = {
                        id_anggota: user.id_anggota,
                    }
                    serviceDeleteAnggota(data_item, function(err, result){
                        if(err){
                            console.log(err)
                            return
                        }
                        if(!result){
                            return res.json({
                                success: 0,
                                message: "Record not found"
                            })
                        }else{
                            return res.json({
                                success: 1,
                                message: "Delete was successfull"
                            })
                        }
                    })
                }
            })
        }
    },

    controllerLogin: function(req, res){
        const body = req.body
        serviceGetAnggotaByEmail(body.email, function(err, result){
            if(err){
                console.log(err)
                return
            }
            if(!result){
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result1 = compareSync(body.password, result.password)
            if(result1){
                result.password = undefined
                const token = sign({result1:result}, "secretkey", {
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "Login successfull",
                    account: result,
                    token: token
                })
            }
        })
    }



}