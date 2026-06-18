"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single("foto");

class FotoController {
  async store(req, res) {
    try {
      // Usando uma Promise para envelopar o upload e forçar o Express a esperar
      await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      // Se chegou aqui, o Multer processou o arquivo com sucesso
      if (!req.file) {
        return res.status(400).json({ errors: ["Nenhum arquivo enviado."] });
      }

      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;
      const foto = await _Foto2.default.create({ originalname, filename, aluno_id });

      return res.json(foto);
    } catch (error) {
      // Qualquer erro do Multer vai cair AQUI e responder a requisição, em vez de travar
      console.error("Erro capturado no Multer:", error);
      return res.status(400).json({
        errors: [error.code || error.message || "Erro interno no upload."],
      });
    }
  }
}

exports. default = new FotoController();
