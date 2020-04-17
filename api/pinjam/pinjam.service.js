const db = require('../../config/connection');
module.exports = {
    addTransaksi:(data,callBack)=>{
        db.query(`select * from buku where id_buku = ?`,
        [data.id_buku],
        (err,results)=>{
            if(err){
                console.log(err);
                return;
            }else if(!results[0]){
                return callBack("buku404")
            }else if(results[0].stok < 1){
                return callBack("habis")
            }else{
                db.query(`select id_anggota from anggota where id_anggota = ?`,
                [data.id_anggota],
                (err,results)=>{
                    if(err){
                        console.log(err);
                        return;
                    }else if(!results[0]){
                        return callBack("anggota404")
                    }else{
                        db.query(`select id_petugas from petugas where id_petugas = ?`,
                        [data.id_petugas],
                        (err,results)=>{
                            if(err){
                                console.log(err);
                                return;
                            }else if(!results[0]){
                                return callBack("petugas404")
                            }else{
                                db.query(`insert into pinjam set ?`,
                                [data],
                                (err,results)=>{
                                    if(err){
                                        return callBack(err)
                                    }else{
                                        db.query(`select * from buku where id_buku = ?`,
                                        [data.id_buku],
                                        (err,results)=>{
                                            if(err){
                                                console.log(err);
                                                return;
                                            }else{
                                                hasil = results[0].stok - 1;
                                                db.query(`update buku set stok=? where id_buku = ?`,
                                                [
                                                    hasil,
                                                    data.id_buku
                                                ]);
                                            }
                                        })
                                    }
                                    return callBack(null,results)
                                })
                            }
                        })
                    }
                })
            }
        })  
    },


    getTransaksi:(callBack)=>{
        db.query(`select * from pinjam`,
        [],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, results[0])
            }
        })
    },
    getIdTransaksi:(data,callBack)=>{
        db.query(`select * from pinjam where id_transaksi = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,results[0])
            }
        })
    },

    deleteTransaksi:(data,callBack)=>{
        db.query(`delete from pinjam where id_transakasi = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,results[0])
            }
        })
    }
}