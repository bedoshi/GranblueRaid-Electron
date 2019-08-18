const NN = require('node-notifier')

module.exports = {
  notification: (title = 'Todo Notifier', message = 'Sample Notification') => {
    NN.notify({
      title,
      message,
      wait: false
    })
  }
}