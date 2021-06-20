const bodyParser = require('body-parser');
const express = require('express');
const STATUS_USER_ERROR = 422;
//This array of post persists in memory across request. Feel free
//to change this to a let binding if you need to reassing it.
let posts = [];
let nextId = 1;
const server = express();
//to enable parsing of json bodies for post requests
server.use(bodyParser.json());
//TODO: your code to handle requests
server.post('/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    if(!title){
        res.status(STATUS_USER_ERROR);
        return res.json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    if(!contents){
        res.status(STATUS_USER_ERROR);
        return res.json({error: "No se recibieron los parámetros necesarios para crear el Post"});    
    }
    const nuevoPost = {
        id: nextId,
        title,
        contents
    }
    nextId++;
    posts.push(nuevoPost);
    res.json(nuevoPost);
});
server.get('/posts', (req, res) => {
    const term = req.query.term;
    if(!term) {
     res.json(posts);
    } else {
     const filtrados = posts.filter(post => {
         return (post.title.indexOf(term) !== -1) || (post.contents.indexOf(term) !== -1);
     })
     res.json(filtrados);
    }
});
server.put('/posts', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const contents = req.body.contents;
    if(!id || !title || !contents) {
        res.status(STATUS_USER_ERROR);
        return res.json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    }
    const post = posts.find(p => p.id === id);
    if(!post) {
        res.status(STATUS_USER_ERROR);
        return res.json({error: "El id ingresado no corresponde con una publicación existente"});
    }
    post.title = title;
    post.contents = contents;
    res.json(post);
});
server.delete('/posts', (req, res) => {
    const id = req.body.id;
    if(!id) {
        res.status(STATUS_USER_ERROR);
        return res.json({error: "No se ingreso ningún ID"});
    }
    const post = posts.find(p => p.id === id);
    if(!post) {
        res.status(STATUS_USER_ERROR);
        return res.json({error: "El id ingresado no corresponde con una publicación existente"});
    }
    posts = posts.filter(p => p.id !== id);
    res.json({ success: true});
})
module.exports = { posts, server };