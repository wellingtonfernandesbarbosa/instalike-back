import express from "express";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postController.js";
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Configura o armazenamento para o upload de arquivos
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // Define o nome do arquivo
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Cria uma instância do multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage: storage });

const routes = (app) => {
  // Permite que o servidor interprete requisições JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);
  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost);
  // Rota POST para realizar o upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  // Rota PUT para atualizar um post existente
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
