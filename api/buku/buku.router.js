const {
    controllerAddBuku,
    controllerUpdateBuku,
    controllerDeleteBuku,
    controllerGetBuku,
} = require("./buku.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/add", checkToken, controllerAddBuku);
router.patch("/", checkToken, controllerUpdateBuku);
router.delete("/", checkToken, controllerDeleteBuku);
router.get("/", checkToken, controllerGetBuku);



module.exports = router;
