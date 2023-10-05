import fs from 'node:fs'
import {parse} from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath);

const csvParse = parse ({
  delimiter: ',', //delimita um espaço 
  skipEmptyLines: true,//pula qualquer tipo de linha vazia
  fromLine: 2 //skip header , começa a partir da linha 2 
})

async function run() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }

}

run()



