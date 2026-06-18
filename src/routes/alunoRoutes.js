import { Router } from "express";
import AlunoController from "../controllers/AlunoController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", AlunoController.index);
router.get("/", loginRequired, AlunoController.store);
router.get("/:id", loginRequired, AlunoController.update);
router.get("/:id", AlunoController.show);
router.get("/:id", loginRequired, AlunoController.delete);

export default router;
