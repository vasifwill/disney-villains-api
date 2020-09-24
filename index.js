const express = require('express')
const bodyParser = require('body-parser')
const {findTitle, getAllVillains, newVillains} = require('./controller/villainscon')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', findTitle)

app.post('/', bodyParser.json(), newVillains)



app.listen(1337)
