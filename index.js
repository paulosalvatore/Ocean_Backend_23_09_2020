const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

// Criando um bloco assíncrono
(async () => {

// Se for uma aplicação real e um banco que você quer proteger a senha, não coloque essas informações no
// GitHub. Procure sempre utilizar as variáveis de ambiente para isso.
const connectionString = 'mongodb+srv://admin:Uu8ftSpPxbyJiNk@cluster0.4hryz.mongodb.net/ocean_mongodb?retryWrites=true&w=majority';

// async/await

console.info('Conectando ao banco de dados MongoDB!');

const client = await mongodb.MongoClient.connect(connectionString, {
    useUnifiedTopology: true
});

console.info('Banco de dados conectado com sucesso!');

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
    res.send('Hello world com MongoDB!');
});

// Endpoints de envio de mensagens
// CRUD -> Create, Read (Read All e Read Single), Update and Delete
// CRUD -> Criar, Ler (Ler tudo e ler individualmente), atualizar e remover

const db = await client.db('ocean_mongodb');

const mensagens = await db.collection('mensagens');

// Read All
app.get('/mensagens', async (req, res) => {
    const findResult = await mensagens.find({}).toArray();

    res.json(findResult);
});

// Create
app.post('/mensagens', (req, res) => {
});

// Read Single
app.get('/mensagens/:id', (req, res) => {
});

// Update
app.put('/mensagens/:id', (req, res) => {
});

// Delete
app.delete('/mensagens/:id', (req, res) => {
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});

// Fecho o bloco assíncrono e executo
})();
