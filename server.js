import express from "express";
import routes from "./src/routes/postRoutes.js";

// Cria uma instância do aplicativo Express.
const app = express();

// Carrega as rotas definidas no arquivo postRoutes.js e as registra no aplicativo.
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
  console.log("Servidor escutando...");
});
