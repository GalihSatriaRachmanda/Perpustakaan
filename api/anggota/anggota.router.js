const {
    controllerAddAnggota,
    controllerUpdateAnggota,
    controllerDeleteAnggota,
    controllerGetAnggotaById,
    controllerLogin
} = require("./anggota.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/register", controllerAddAnggota);
router.patch("/", checkToken, controllerUpdateAnggota);
router.delete("/", checkToken, controllerDeleteAnggota);
router.get("/profile", checkToken, controllerGetAnggotaById);
router.post("/login", controllerLogin);

module.exports = router;
