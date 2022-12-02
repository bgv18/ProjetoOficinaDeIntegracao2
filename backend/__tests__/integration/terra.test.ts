const { Terras } = require('../../models')
import { expect, test} from 'vitest'
const request = require('supertest')
const app = require('../../index')
const nock = require('nock')
const getTerras = require('../../routes/terras')

nock('http://localhost:3001')
.persist()
.get('/Terras')
.reply(200)

test('create an Place', () => {
    const terra = new Terras({
        terra: '1',
        cidade: 'Cornélio Procópio',
        cliente: 'John Doe',
        condicao: 'Boa'
    })

    expect(terra).toBeInstanceOf(Terras)
    expect(terra.cliente).toEqual('John Doe')
})

test('GetById', async() => {
    const result = await getTerras()
    expect(Array.isArray(result)).toBeTruthy()
})