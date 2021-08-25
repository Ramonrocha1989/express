const app = require('express')();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let clients = [
    {id: 1, nome:'Ramon Rocha', telefone:'53984590461'},
    {id: 3, nome:'Dimaima Rocha', telefone:'53988690461'},
    {id: 2, nome:'Davi Rocha', telefone:'53984590573'},
    {id: 4, nome:'Viccenzo Rocha', telefone:'53981695471'},
    {id: 5, nome:'Isabely Rocha', telefone:'53981624491'},

]

function log (request, response, next){
    const {url, method} = request;
    console.log(`${method} - ${url} at ${new Date()}`)
    return next();
}
app.use(log)

app.get('/clients', (request, response) => response.json(clients))

app.get('/clients/:id', (request, response) => {
    const {id} = request.params;
    const client = clients.find(value => value.id == id);
    if(client == undefined){
        response.status(400).json({error: 'Requisição inválida'});
    }else{
        response.status(200).json(client);
    }
})

app.post('/clients', (request, response) => {
    const client = request.body
    clients.push(client)
    response.json(client)
})

app.put('/clients/:id', (request, response) => {
    const id = request.params.id
    const nome = request.body.nome

    let client = clients.filter(value =>value.id == id) 
    if(client == undefined){
        response.status(400).send();
    }else{
        client.nome = nome;
        response.status(200).json(client);
    }
})

app.delete('/clients/:id', (request, response) => {
    const {id} = request.params;
    const index = clients.findIndex(value => value.id == id);
    if(index == -1){
        response.status(400).send();
    }else{
        clients.splice(index,1);
        response.status(204).send();
    }
})

app.listen(3000);