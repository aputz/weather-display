# weather-display

It's a simple weather app with few additional backend features.

The first version was a recruitment task, but I've decided to add something extra, just for testing purposes.
Initially, the app was supposed to search and display data from local json and make calls to external api. It's extended by intermediary backend, which allows more efficient search feature and generating an image of selected area.

## Demo [availaible here](https://wdisplay.herokuapp.com/search)

## Used in project
### Frontend
- Vue.js
- Vuex
- Vue-router
- Axios
- Buefy
### Backend
- Node.js
- Express
- Staticmaps

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run server
```
npm run server
```

## Server setup
Please note, for server to run properly, you need to create a .env file containing values listed below:
```
API_ADDRESS = address of the weather api
API_KEY = key of the api
PORT = port you wish to run the app on
```
