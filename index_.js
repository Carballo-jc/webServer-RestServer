//const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

//Let ID agregado x Cirix
let id = 1;

//esto viene
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json()); //idem -> server.use(bodyParser.json())

// TODO: your code to handle requests
server.post("/posts", function (req, res) {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  } else {
    obj = {
      author,
      //author: req.body.author,//Sin destructuring
      title,
      //title: req.body.title,//Sin destructuring
      contents,
      //contents: req.body.contents,//Sin destructuring
      id: id++,
    };
    posts.push(obj);
    res.send(obj);
  }
});
//  /posts/author/:author
server.post("/posts/author/:author", function (req, res) {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  } else {
    obj = {
      author,
      //author: req.params.author,//Sin destructuring
      title,
      //title: req.body.title,//Sin destructuring
      contents,
      //contents: req.body.contents,//Sin destructuring
      id: id++,
    };
    posts.push(obj);
    res.send(obj);
  }
});

server.get("/posts", function (req, res) {
  const { term } = req.query;
  if (!term) {
    res.send(posts);
  }
  if (term) {
    var arr = posts.filter(
      (element) =>
        element.title.includes(term) || element.contents.includes(term)
    );
    res.send(arr);
  }
});

server.get("/posts/:author", function (req, res) {
  const { author } = req.params;
  var arr = posts.filter((element) => element.author === author);
  if (arr.length > 0) {
    res.send(arr);
  } else {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "No existe ningun post del autor indicado",
    });
  }
});

server.get("/posts/:author/:title", function (req, res) {
  const { author, title } = req.params;
  var arr = posts.filter(
    (element) => element.author === author && element.title === title
  );
  if (arr.length > 0) {
    res.send(arr);
  } else {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "There is no author with those titles",
    });
  }
});

server.put("/posts", function (req, res) {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }
  var index = posts.findIndex((element) => element.id === id);
  if (index === -1) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "El id es invalido",
    });
  } else {
    posts[index] = {
      ...posts[index],
      title,
      contents,
    };
    res.send(posts[index]);
  }
});

server.delete("/posts", function (req, res) {
  const { id } = req.body;
  var existe = posts.some((element) => element.id === id);
  if (!id || !existe) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "El id es invalido o no existe",
    });
  } else {
    posts = posts.filter((element) => element.id !== id);
    res.json({
      success: true,
    });
  }
});

server.delete("/author", function (req, res) {
    const { author } = req.body;
    var authorExiste = posts.some((element) => element.author === author);
    if (!author || !authorExiste) {
      res.status(STATUS_USER_ERROR);
      res.json({
        error: "There is no author that matches",
      });
    } else {
      postsAuthorEliminado = posts.filter((element) => element.author === author);
      posts = posts.filter((element) => element.author !== author);
      res.json(postsAuthorEliminado);
    }
  });



module.exports = { posts, server };