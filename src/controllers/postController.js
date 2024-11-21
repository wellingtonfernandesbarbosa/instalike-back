import { getTodosOsPosts, criarPost } from "../models/postModel.js";
import fs from "fs";

// Função assíncrona que lista todos os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados (assumindo que getTodosOsPosts retorna uma Promise)
  const posts = await getTodosOsPosts();

  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);

  // Exibe uma mensagem no console para fins de log
  console.log("Conteúdo requisitado");
}

// Função assíncrona que cria um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;

  try {
    // Chama a função criarPost para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante a criação do post
    console.error("Erro ao postar", error.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor)
    res.status(500).json({ "Erro: ": "Falha na requisição!" });
  }
}

// Função assíncrona que cria um novo post com upload de imagem
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    // Cria o novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Constrói o novo nome da imagem com o ID do post inserido
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante o processo de upload
    console.error("Erro ao postar", error.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor)
    res.status(500).json({ "Erro: ": "Falha na requisição!" });
  }
}
