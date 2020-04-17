const db = require("../../config/connection")

module.exports = {
    serviceAddBuku: (data, callBack)=>{
        db.query(
            `insert into buku (judul, penulis, penerbit, tahun, stok) values (?,?,?,?,?)`,
            [
                data.judul,
                data.penulis,
                data.penerbit,
                data.tahun,
                data.stok
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

    serviceUpdateBuku: (data, callBack)=>{
        db.query(
            'UPDATE buku SET judul=?, penulis=?, penerbit=?, tahun=?, stok=? WHERE id_buku=?',
            [
                data.judul,
                data.penulis,
                data.penerbit,
                data.tahun,
                data.stok,
                data.id_buku
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

    serviceDeleteBuku: (data, callBack)=>{
        db.query(
            'Delete from buku WHERE id_buku=?',
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

    serviceGetBuku: (callBack)=> {
        db.query(
            'select * from buku',
            (err, results, field) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results)
                }
            }
        )   
    },

}
