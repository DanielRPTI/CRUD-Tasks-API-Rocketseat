
//reduce precorre um array para transformar em um novo objeto ou qualquer coisa que decida no fim da function 
export function extractQueryParams (query){
  //substr(1) mata o primeiro conteudo da query no caso o ?
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams [key] = value
    return queryParams
  }, {})
}