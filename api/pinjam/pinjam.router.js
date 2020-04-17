const{
    controllerAddTransaksi,
    controllerGetTransaksi,
    controllerGetIdTransaksi,
    controllerDeleteTransaksi
} = require('./pinjam.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.post('/', checkToken, controllerAddTransaksi);
router.get('/', checkToken, controllerGetTransaksi);
router.get('/id', checkToken, controllerGetIdTransaksi);
router.delete('/', checkToken, controllerDeleteTransaksi);

module.exports = router;