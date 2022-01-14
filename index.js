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
  const h = await f.headers
  const st = await f.status
  const json = await f.json()
  res.send([json, {"status":st,lag:Math.floor(Date.now() - time)}, h])
    } catch (err) {
      try {
      var time1 = Date.now()
      const f1 = await fetch(req.query.url)
      const st1 = await f1.status
      res.send([{error:"The URL doesn't provide a valid JSON response or is protecting itself from getting requests from automated clients."}, {"status":st1,lag:Math.floor(Date.now() - time1)}])
    } catch(err1) {
     res.send([{error:"The URL failed to respond. Not Found."}, {"status":404,lag:Math.floor(Date.now() - time1)}]) 
    }
    }
  }
})

app.listen(process.env.PORT, () => {
  console.log('running')
}) 
