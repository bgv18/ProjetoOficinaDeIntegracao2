const { Clientes } = require('../../models')
import { expect, test} from 'vitest'
const request = require('supertest')
const app = require('../../index')
const nock = require('nock')
const getClienteById = require('../../routes/clientes')

nock('http://localhost:3001')
.persist()
.get('/Clientes/GetById/:id')
.reply(200, [{
    id: 1
}])

test('create an Cliente', () => {
    const cliente = new Clientes({
        cpfOuCnpj: '541.604.560-49',
        nome: 'John Doe',
        cidade: 'Cornélio Procópio',
        estado: 'Paraná',
        pais: 'Brasil'
    })

    expect(cliente).toBeInstanceOf(Clientes)
    expect(cliente.nome).toEqual('John Doe')
})

test('should create a user', async () => {
    const response = await request(app)
    .post('/clientes')
    .send({
        cpfOuCnpj: '541.604.560-49',
        nome: 'John Doe',
        cidade: 'Cornélio Procópio',
        estado: 'Paraná',
        pais: 'Brasil'
    });

    expect(response.status).toBe(200);
    expect(response.body.Clientes.nome).toBe('John Doe')
})

test('GetById', async() => {
    const result = await getClienteById()
    expect(Array.isArray(result)).toBeTruthy()
})