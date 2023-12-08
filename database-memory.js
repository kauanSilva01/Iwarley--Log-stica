import { randomUUID } from "crypto"

export class DatabaseMemory{
#livros = new Map()

list(search){
    return Array.from(this.#livros.entries()).map((livrosArray) =>{
    // acessando primeira posição
        const id = livrosArray[0]
        const data = livrosArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(livro => {
        if (search){
            return livro.titulo.includes(search)
        }
        return true
    })
}
create(livro){
    const livroId = randomUUID()
    this.#livros.set(livroId, livro)
}
update(id, livro){
    this.#livros.set(id, livro)
}
delete(id, livro){
    this.#livros.delete(id, livro)
}
}