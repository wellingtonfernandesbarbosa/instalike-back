import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/gemini-service.js";

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

export async function atualizarNovoPost(req, res) {
  // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
  const id = req.params.id;

  // Constrói a URL da imagem, assumindo que a imagem será armazenada localmente.
  // **Observação:** Essa lógica de construção da URL pode precisar ser ajustada dependendo da sua estrutura de armazenamento de imagens.
  const urlImagem = `http://localhost:3000/${id}.png`;

  // Tenta atualizar o post usando a função `atualizarPost` (não mostrada no código).
  try {
    // Obtem o buffer da imagem localmente.
    const imageBuffer = fs.readFileSync(`./uploads/${id}.png`);
    // Gera a descrição da imagem usando o serviço Gemini.
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    // Cria um objeto com os dados do post a ser atualizado, extraindo a descrição e o texto alternativo do corpo da requisição.
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    // Chama a função `atualizarPost` para atualizar o post no banco de dados.
    const postCriado = await atualizarPost(id, post);

    // Se a atualização for bem-sucedida, retorna o post atualizado com status 200.
    res.status(200).json(postCriado);
  } catch (error) {
    // Se ocorrer algum erro durante a atualização, registra o erro no console e retorna uma mensagem de erro com status 500.
    console.error("Erro ao postar", error.message);
    res.status(500).json({ "Erro: ": "Falha na requisição!" });
  }
}
