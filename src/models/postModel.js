// Importa a função `ObjectId` do módulo `mongodb` para trabalhar com IDs de objetos.
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbCOnfig.js";

import "dotenv/config";

// Conecta ao banco de dados utilizando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosOsPosts() {
  // Seleciona o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Retorna um array com todos os documentos da coleção
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a operação de inserção.
  return colecao.insertOne(novoPost);
}

// Define uma função assíncrona chamada `atualizarPost` que recebe dois parâmetros:
// - `id`: O ID do post a ser atualizado.
// - `novoPost`: O novo objeto de post com os dados atualizados.
export async function atualizarPost(id, novoPost) {
  // Obtém uma conexão com o banco de dados "imersao-instabyte".
  const db = conexao.db("imersao-instabyte");

  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");

  // Converte o ID do post recebido como string em um objeto ObjectId do MongoDB.
  const objectId = ObjectId.createFromHexString(id);

  // Atualiza o post com o ID especificado, substituindo os dados com o `novoPost`.
  // A operação de atualização é assíncrona, por isso retorna uma Promise.
  return colecao.updateOne({ _id: new ObjectId(objectId) }, { $set: novoPost });
}
