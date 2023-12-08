import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/livro', (request, reply) => {
// Acessando dados do corpo da requisição
    const {titulo, autor, npaginas} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
    })

    return reply.status(201).send
})

server.get('/livro', (request) => {
    const search = request.query.search
    console.log(search)
    const livros = database.list(search)
    console.log(livros)
    return livros
})

server.put('/livros/:id', (request, reply) => {
    const livroId = request.params.id
    const {titulo, autor, npaginas} = request.body
    const livro = database.update(livroId, {
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
    })
    return reply.status(204).send()
})

server.delete('/livros/:id', (request, reply) => {
    const livroId = request.params.id

    database.delete(livroId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})