const db = require("../../config/connection")

module.exports = {
    serviceAddPetugas:(data, callBack)=>{
        db.query(
            `insert into petugas (firstname, lastname, gender, email, password, number) values (?,?,?,?,?,?)`,
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

    serviceGetPetugasById: (data, callBack)=> {
        db.query(
            'select * from petugas where id_petugas = ?',
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

    serviceUpdatePetugas:(data, callBack)=>{
        db.query(
            'update petugas set firstname=?, lastname=?, gender=?, email=?, password=?, number=? WHERE id_petugas=?',
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id_petugas
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

     serviceDeletePetugas:(data, callBack)=>{
         db.query( 
            'delete from petugas where id_petugas=?',
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

    serviceGetPetugasByEmail: (email, callBack) =>{
        db.query(
            'select firstName, email, password, id_petugas, status from petugas where email = ?',
            [email],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results[0])
                }
            }
        )
    },
}