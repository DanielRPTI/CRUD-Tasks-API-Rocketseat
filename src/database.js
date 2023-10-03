//Salvar sempre quando reinciar o sistema araves do FS form 
import fs from "node:fs/promises"
// destina a onde sera criado o bacon de dados local import.meta variavel global que mostra onde se encontra o caminho do documento NEW URL pode perimitir criar o caminho a onde deseja inserir seu BD local
const databasePath = new URL('../db.json', import.meta.url)

class Database {
  #database = {}

  //popula o nosso arquivo quando a aplicação é inicializada 
  constructor() {
    fs.readFile(databasePath, 'utf-8')
    .then( data => {
      this.#database = JSON.parse(data)
    })
    .catch(() =>{
      this.#persist()
    })
  }
  #persist() {
    fs.writeFile(databasePath , JSON.stringify(this.#database))
  }


  select (table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data ){
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    }else {
      this.#database[table] = [data]
    }
    
    this.#persist()
    return data 
  }

  delete (table, id ) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex,1)
      this.#persist()
    }
  }

  update(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1){
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
      
    }
  }

}