const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const search = require(path.join(__dirname, '/server/controllers/search'))

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/server/static')))
app.use(serveStatic(path.join(__dirname, '/dist')))

app.use((req, res, next) => {
  if (req.url.includes('/api')) {
    req.url = req.url.split('/').filter(part => part !== 'api').join('/')
  }
  next()
})

app.get('/search/:query', search.matchQuery, (req, res) => {
  res.json(res.locals)
})

app.get('/forecast/name', search.getForecastByName, search.getImage, (req, res) => {
  res.json(res.locals)
})

app.get('/forecast/:id', search.getForecastById, search.getImage, (req, res) => {
  res.json(res.locals)
})

app.get('/forecast', search.getForecastByCoords, search.getImage, (req, res) => {
  res.json(res.locals)
})

app.route('/*').get(function (req, res) {
  if (process.env.env !== 'DEV') {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  }
})

app.listen(port, () => console.log(`App listening on ${port}!`))
