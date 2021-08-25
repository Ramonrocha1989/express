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

app.get('/clients', (request, response) => response.json(clients))

app.get('/clients/:id', (request, response) => {
    const client = clients.filter(value =>value.id == request.params.id)
    response.json(client)
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
    client[0].nome = nome
    response.json(client[0])
})

app.delete('/clients/:id', (request, response) => {
    const id = request.params.id
    const client = clients.filter(value =>value.id != id)
    response.json(client)
})

app.listen(3000);