import express from "express";
import { listarPosts } from "../controllers/postController.js";

const routes = (app) => {
  // Permite que o servidor interprete requisições JSON
  app.use(express.json());
  // Rota GET para a URL "/posts"
  app.get("/posts", listarPosts);
}

export default routes;
