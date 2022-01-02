const app = require('express')()

app.set('json_spaces', 1)
app.use(require('cors')())

app.get('/', (req, res) => {
  if (!req.query.url) {
    res.send({'error':"No url provided"})
  } else {
  const fetch = require('node-fetch')
  fetch(req.query.url)
  .then(res => res.json())
  .then(json => {
    res.send(json)
  }).catch(err => {
    res.send({error:"The URL doesn't provide a valid JSON response or is protecting itself from getting requests from automated clients."})
  })
  }
})

app.listen(process.env.PORT, () => {
  console.log('running')
})