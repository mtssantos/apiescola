"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  // Adicionar um novo registro

  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email } = novoUser;

      res.json({ id, nome, email });
    } catch (error) {
      console.log(error);
      res.status(400).json(error.errors.map((e) => e.message));
    }
  }

  // Buscar todos os registros

  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ["id", "nome", "email"] });
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }

  // Buscar um registro específico

  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      const { id, nome, email } = user;

      return res.json({ id, nome, email });
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }

  // Realizar uma atualização no registro.

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ["Id não enviado."],
        });
      }

      const novosDados = await user.update(req.body);
      return res.json(novosDados);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }

  // Deletar dados

  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ["Id não enviado."],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }
}

exports. default = new UserController();
