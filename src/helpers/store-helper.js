export const StoreActions = {
  GET_FORECAST_BY_ID: 'getForecastById',
  GET_FORECAST_BY_COORDS: 'getForecastByCoords',
  GET_SUGGESTIONS: 'setSuggestions',
  SET_LOADING: 'setLoading'
}

export const StoreMutations = {
  SET_FORECAST: 'setForecast',
  SET_CITY_DATA: 'setCityData',
  SET_SUGGESTIONS: 'setSuggestions',
  SET_LOADING: 'setLoading'
}

export const StoreGetters = {
  FORECAST: 'forecast',
  CITY_DATA: 'cityData',
  SUGGESTIONS: 'suggestions',
  ISLOADING: 'isLoading'
}
