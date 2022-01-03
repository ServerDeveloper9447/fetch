const app = require('express')()
const fetch = require('node-fetch')
app.set('json_spaces', 1)
app.use(require('cors')())

app.get('/', async (req, res) => {
  if (!req.query.url) {
    res.send({'error':"No url provided"})
  } else {
    try {
      var time = Date.now()
  const f = await fetch(req.query.url)
  const st = await f.status
  const json = await f.json()
  res.send([json, {"status":st,lag:Math.floor(Date.now() - time)}])
    } catch (err) {
      var time1 = Date.now()
      res.send([{error:"The URL doesn't provide a valid JSON response or is protecting itself from getting requests from automated clients."}, {"status":"unknown",lag:Math.floor(Date.now() - time1)}])
    }
  }
})

app.listen(process.env.PORT, () => {
  console.log('running')
}) 
