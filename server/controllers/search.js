const fs = require('fs')
const path = require('path')

const axios = require('axios')
const list = require(path.join(__dirname, '../static/city.list.json'))
const mapRenderer = require(path.join(__dirname, '../helpers/map-render'))

exports.matchQuery = (req, res, next) => {
  const { query } = req.params
  const result = list.filter(function (city) {
    if (this.count >= 5) return false
    if (city.name.toLowerCase().includes(query.toLowerCase())) {
      this.count++
      return true
    }
  }, { count: 0 })
  res.locals.result = result.map(item => {
    const { id, name, country } = item
    return { id, name, country }
  })
  next()
}

exports.getForecastById = async (req, res, next) => {
  const { id } = req.params
  const params = {
    appid: process.env.API_KEY,
    id,
    units: 'metric'
  }
  const url = process.env.API_ADDRESS
  res.locals.result = await axios.get(url, { params })
    .then(response => {
      if (response.data.list) {
        response.data.list = response.data.list.reduce((tabbed, current) => {
          // eslint-disable-next-line camelcase
          const { dt_txt } = current
          const date = dt_txt.slice(0, 10)
          if (Object.prototype.hasOwnProperty.call(tabbed, date)) {
            tabbed[date].forecast.push(current)
          } else {
            tabbed = Object.assign(tabbed, { [date]: { date, forecast: [current] } })
          }
          return tabbed
        }, {})
      }
      return response.data
    })
    .catch(e => {
      if (e.response) {
        const { cod, message } = e.response.data
        res.locals.message = message
        res.sendStatus(cod)
      }
      next(e)
    })
  next()
}

exports.getForecastByCoords = async (req, res, next) => {
  const { lat, lon } = req.query
  const params = {
    appid: process.env.API_KEY,
    lat,
    lon,
    units: 'metric'
  }
  const url = process.env.API_ADDRESS
  res.locals.result = await axios.get(url, { params })
    .then(response => {
      if (response.data.list) {
        response.data.list = response.data.list.reduce((tabbed, current) => {
          // eslint-disable-next-line camelcase
          const { dt_txt } = current
          const date = dt_txt.slice(0, 10)
          if (Object.prototype.hasOwnProperty.call(tabbed, date)) {
            tabbed[date].forecast.push(current)
          } else {
            tabbed = Object.assign(tabbed, { [date]: { date, forecast: [current] } })
          }
          return tabbed
        }, {})
      }
      return response.data
    })
    .catch(e => {
      if (e.response) {
        const { cod, message } = e.response.data
        res.locals.message = message
        res.sendStatus(cod)
      }
      next(e)
    })
  next()
}

exports.getImage = async (req, res, next) => {
  if (res.locals.result) {
    const { id, coord } = res.locals.result.city
    const imagePath = path.join(__dirname, `../static/maps/${id}.png`)
    fs.access((imagePath), fs.OK, async e => {
      if (e) {
        await mapRenderer.renderMap(coord.lon, coord.lat, id)
      }
      res.locals.result.city.imageSrc = `http://${req.headers.host}/maps/${id}.png`
      next()
    })
  }
}
