require('dotenv').config()
const express = require('express')
const Bundler = require('parcel-bundler')
const path = require('path')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')

const app = express()
const bundler = new Bundler(path.join(__dirname, 'client', 'index.html'))
const router = express.Router()

app.use('/assets', serveStatic(path.join(__dirname, 'client', 'assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/games', (req, res) => {
	res.redirect('https://cdn.staticaly.com/gh/LouisRiverstone/CriacaoJogosLabKids/master/index.html')
})

router.use('/galeria', require('./routes/galeria'))
router.use('/mensagem', require('./routes/mensagem'))

app.use('/api', router)
app.use(bundler.middleware())
app.listen(process.env.PORT || 8080, () => {
	console.log('Rodando!')
})