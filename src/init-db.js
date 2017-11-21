const request = require ('request')
const chalk = require('chalk')
const data = require('./data.json')


const url = `http://localhost:8080/api/artist`

for(let item of data) {
  request({
    method: 'GET',
    url: `${url}/search/${item.name}`,
    json: true
  },
  (err, resp, body) => {
    if (resp.statusCode === 200) {
      const result = body.result
      if (result.length === 0) {
        console.log(chalk.green(`adding artist '${item.name}'`))
        request({
          method: 'POST',
          url: url,
          body: item,
          json: true
        },
        (err, resp, /* body */) => {
          if (resp.statusCode === 201) {
            console.log(chalk.green(`successfully added '${item.name}'`))
          } else {
            console.log(chalk.red(`failed to add '${item.name}'`))
          }
        })
      } else {
        console.log(chalk.yellow(`item '${item.name}' already exists`))
      }
    }
  })
}
