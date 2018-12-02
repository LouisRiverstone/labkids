const router = require('express').Router()
const Flickr = require('flickr-sdk')
const flickr = new Flickr(process.env.FLICKR_KEY)

router.get('/:page', (req, res) => {
	flickr.photos.search({
		user_id: '141027438@N07',
		page: req.params.page,
		per_page: 30,
		extras: 'url_o,description,media,url_s'
	}).then(response => {
		res.json(response.body)
	}).catch(err => {
		res.status(500).send(err.message)
	})
})

router.get('/foto/:id', (req, res) => {
	flickr.photos.getInfo({
		photo_id: req.params.id,
		extras: 'sizes'
	}).then(response => {
		res.json(response.body.photo)
	}).catch(err => {
		res.status(500).send(err.message)
	})
})

module.exports = router