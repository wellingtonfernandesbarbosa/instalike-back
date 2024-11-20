import getTodosOsPosts from "../models/postModel.js";

export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados
  const posts = await getTodosOsPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
  // Exibe uma mensagem no console indicando que o conteúdo foi requisitado
  console.log("Conteúdo requisitado");
}
