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
app.post('/mensagens', async (req, res) => {
    // Obtendo a mensagem que foi recebida através do body da requisição
    const mensagem = req.body;

    // Insiro a mensagem na collection de mensagens do MongoDB
    const resultado = await mensagens.insertOne(mensagem);

    const objetoInserido = resultado.ops[0];

    // Envio a mensagem de sucesso, informando o ID obtido
    res.json(objetoInserido);
});

// Read Single
app.get('/mensagens/:id', async (req, res) => {
    // Pega o ID através dos parâmetros da requisição
    const id = req.params.id;

    // Acessamos a mensagem de acordo com o ID informado
    const mensagem = await mensagens.findOne({ _id: mongodb.ObjectId(id) });

    res.json(mensagem);
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
