export const StoreActions = {
  GET_FORECAST_BY_ID: 'getForecastById',
  GET_FORECAST_BY_COORDS: 'getForecastByCoords',
  GET_FORECAST_BY_NAME: 'getForecastByName',
  GET_SUGGESTIONS: 'setSuggestions',
  GET_LOADING: 'getLoading',
  GET_FETCHING_DATA: 'getFetchingData'
}

export const StoreMutations = {
  SET_FORECAST: 'setForecast',
  SET_CITY_DATA: 'setCityData',
  SET_SUGGESTIONS: 'setSuggestions',
  SET_LOADING: 'setLoading',
  SET_FETCHING_DATA: 'setFetchingData',
  SET_WEATHER_DESC: 'setWeatherDesc'
}

export const StoreGetters = {
  FORECAST: 'forecast',
  CITY_DATA: 'cityData',
  SUGGESTIONS: 'suggestions',
  ISLOADING: 'isLoading',
  IS_FETCHING_DATA: 'isFetchingData',
  WEATHER_DESC: 'weatherDesc'
}
