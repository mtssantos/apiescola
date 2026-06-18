import { Router } from "express";
import UserController from "../controllers/UserController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// Não deveria existir - em api's públicas
router.get("/", loginRequired, UserController.index); // Lista usuários
router.get("/:id", UserController.show); // Lista usuario

router.post("/", UserController.store); // Adicionar novos usuários
router.put("/", loginRequired, UserController.update);
router.delete("/", loginRequired, UserController.delete);

export default router;

/**
 * index - lista todos os usuários - GET
 * store/create - cria um novo usuário - POST
 * delete - apaga um usuario - DELETE
 * show - mostra um usuário - GET
 * update - atualiza um usuário - PATCH OU PUT
 */
