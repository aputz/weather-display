export const handleError = (error, toast) => {
  const message = Object.prototype.hasOwnProperty.call(error, 'message') ? error.message : error
  toast(message)
}
