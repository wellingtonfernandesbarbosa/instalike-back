import express from "express";

const posts = [
  {
    id: 0,
    descrição: "Foto de um cachorro",
    imagem: "https://placedog.net/500",
  },
  {
    id: 1,
    descrição: "Paisagem de um pôr do sol",
    imagem: "https://picsum.photos/id/1018/500/300",
  },
  {
    id: 2,
    descrição: "Comida deliciosa",
    imagem: "https://loremflickr.com/500/300/food",
  },
  {
    id: 3,
    descrição: "Foto de dois cachorros",
    imagem: "https://placedog.net/300",
  },
  {
    id: 4,
    descrição: "Foto de um gato",
    imagem: "https://placecats.com/300/200",
  }, {
    id: 5,
    descrição: "Foto de uma linda cidade",
    imagem: "https://loremflickr.com/500/300/tree",
  }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
  console.log("Conteudo reqisitado");
});

const buscarPost = (id) => {
  return posts.findIndex((post) => post.id === Number(id));
};

app.get("/posts/:id", (req, res) => {
  index = buscarPost(req.params.id);
  res.status(200).json(posts[index]);
  console.log("Post reqisitado");
});
