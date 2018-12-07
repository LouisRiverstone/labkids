require('dotenv').config()
const express = require('express')
const Bundler = require('parcel-bundler')
const path = require('path')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
const bundler = new Bundler(path.join(__dirname, 'client', 'index.html'))
const router = express.Router()
const gitData = 'http://samuelnovaes.ml/labkids-dados'

app.use('/assets', serveStatic(path.join(__dirname, 'client', 'assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router.use('/galeria', require('./routes/galeria'))
router.use('/mensagem', require('./routes/mensagem'))

app.use('/api', router)

axios.get(`${gitData}/redirects.json`).then(response => {
	response.data.forEach(redirect => {
		app.get(redirect.route, (req, res) => {
			res.redirect(redirect.url)
		})
	})
	app.use(bundler.middleware())
	app.listen(process.env.PORT || 8080, () => {
		console.log('Rodando!')
	})
})