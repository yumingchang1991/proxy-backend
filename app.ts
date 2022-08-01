import express from 'express'

const app: express.Application = express()

const port: number = 3000

app.get('/', (req, res) => {
  res.send('TS Express Server is on!')
})

app.listen(port, () => console.log('listening on port: ' + port))
