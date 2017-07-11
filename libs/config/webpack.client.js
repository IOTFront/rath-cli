
require('eventsource-polyfill')
const hotClient = require('webpack-hot-middleware/client?reload=true')

// hotClient.subscribe((event) => {
//   console.log('event:-------' + event)
//   if (event.action === 'reload') {
//     window.location.reload()
//   }
// })
