const StaticMap = require('staticmaps')
const path = require('path')

const options = {
  width: 1000,
  height: 400
}

const map = new StaticMap(options)

exports.renderMap = async (lng, lat, index) => {
  return map.render([lng, lat], 10)
    .then(() => map.image.save(path.join(__dirname, `/../static/maps/${index}.png`))
      .catch(e => console.log(e))
    )
}
