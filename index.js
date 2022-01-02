const app = require('express')()

app.set('json_spaces', 1)
app.use(require('cors')())

app.get('/', async (req, res) => {
  if (!req.query.url) {
    res.send({'error':"No url provided"})
  } else {
    try {
      var time = Date.now()
  const fetch = require('node-fetch')
  const f = await fetch(req.query.url)
  const st = await f.status
  const json = await f.json()
  res.send([json, {"status":st,lag:Math.floor(Date.now() - time)}])
    } catch (err) {
      res.send([{error:"The URL doesn't provide a valid JSON response or is protecting itself from getting requests from automated clients."}])
    }
  }
})

app.listen(process.env.PORT, () => {
  console.log('running')
}) 
