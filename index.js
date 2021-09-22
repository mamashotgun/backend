const express = require('express')
const app = express()
const port = 3000
const host = '0.0.0.0'

test

app.get('/', (req, res) => res.send('Alive!'))
app.listen(port, host, () => console.log(`listening on port ` + port))