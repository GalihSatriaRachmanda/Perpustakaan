const db = require("../../config/connection")

module.exports = {
    serviceAddAnggota:(data, callBack)=>{
        db.query(
            `insert into anggota (firstname, lastname, gender, email, password, number) values (?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (err, result, fields)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result)
                }

            }
        )
    },

    serviceGetAnggotaById: (data, callBack)=> {
        db.query(
            'select * from anggota where id_anggota = ?',
            [data.id],
            (err, results, field) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results[0])
                }
            }
        )   
    },

    serviceUpdateAnggota:(data, callBack)=>{
        db.query(
            'update anggota set firstname=?, lastname=?, gender=?, email=?, password=?, number=? WHERE id_anggota=?',
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id_anggota
            ],
            (err, result, fields)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result)
                }
            }
        )
    },

     serviceDeleteAnggota:(data, callBack)=>{
         db.query( 
            'delete from anggota where id_anggota=?',
            [data],
            (err, result, fields)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result)
                }
            }
        )
    },

    serviceGetAnggotaByEmail: (email, callBack) =>{
        db.query(
            'select firstName, email, password, id_anggota, status from anggota where email = ?',
            [email],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results[0])
                }
            }
        )
    }
}