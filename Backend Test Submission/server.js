const express = require('express');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');
const db = require('./database');

const app = express();
app.use(express.json());
app.use(logger);

function makeCode() {
  return uuidv4().slice(0, 6);
}

app.post('/shorturls', (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url) return res.status(400).json({ msg: "url needed" });

  let code = shortcode || makeCode();
  if (db[code]) return res.status(400).json({ msg: "already exists" });

  let now = moment();
  let end = now.clone().add(validity || 30, 'minutes');

  db[code] = {
    url: url,
    made: now.toISOString(),
    end: end.toISOString(),
    clicks: []
  };

  res.status(201).json({
    link: "http://localhost:4000/" + code,
    end: end.toISOString()
  });
});

app.get('/shorturls/:code', (req, res) => {
  let code = req.params.code;
  let found = db[code];
  if (!found) return res.status(404).json({ msg: "not found" });

  res.json({
    url: found.url,
    made: found.made,
    end: found.end,
    count: found.clicks.length,
    clicks: found.clicks
  });
});

app.get('/:code', (req, res) => {
  let code = req.params.code;
  let found = db[code];
  if (!found) return res.status(404).json({ msg: "not found" });

  let now = moment();
  if (now.isAfter(moment(found.end))) {
    return res.status(410).json({ msg: "expired" });
  }

  found.clicks.push({
    time: now.toISOString(),
    from: req.get('Referrer') || 'none',
    place: 'unknown'
  });

  res.redirect(found.url);
});

app.listen(4000, () => {
  console.log("Runnning on port 4000");
});
