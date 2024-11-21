import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  // Tenta estabelecer uma conexão com o banco de dados MongoDB
  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);
    console.log("Conectando ao cluster do banco de dados...");

    // Tenta conectar ao banco de dados
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna o cliente MongoDB para futuras operações
    return mongoClient;
  } catch (error) {
    // Caso ocorra algum erro durante a conexão, imprime uma mensagem de erro no console
    console.error("Falha na conexão com o banco!", error);

    // Encerra o processo com código de saída 1, indicando falha
    process.exit();
  }
}
