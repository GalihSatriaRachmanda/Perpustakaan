const {
    controllerAddPetugas,
    controllerUpdatePetugas,
    controllerDeletePetugas,
    controllerGetPetugasById,
    controllerLogin
} = require("./petugas.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/register", controllerAddPetugas);
router.patch("/update", checkToken, controllerUpdatePetugas);
router.delete("/delete", checkToken, controllerDeletePetugas);
router.get("/profile", checkToken, controllerGetPetugasById);
router.post("/login", controllerLogin);

module.exports = router;
