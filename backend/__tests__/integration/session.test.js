const { Users } = require('../../models');
const request = require ('supertest');
const app = require('../../index')

describe('Authentication', () => {
    it('should authenticate with valid credentials', async() => {
        const user = await new Users({
            nome: 'BGUERRA',
            email: 'bguerra@utfpr.edu.br',
            senha: '123123',
        })
        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                senha: user.senha,
            })

        expect(response.status).toBe(200);
    });
});

describe('Register', () => {
    it('should register a valid user when insert valid properties', async() => {
        const user = await new Users({nome: 'Guerra', email: 'guerra@utfpr.edu.br', senha: '123456'})

        console.log(user);

        expect(user.email).toBe('guerra@utfpr.edu.br');
    });
});