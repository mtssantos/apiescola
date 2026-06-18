import multer from "multer";
import multerConfig from "../config/multerConfig";
import Foto from "../models/Foto";

const upload = multer(multerConfig).single("foto");

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
      const foto = await Foto.create({ originalname, filename, aluno_id });

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

export default new FotoController();
