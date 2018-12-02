const router = require('express').Router()
const nodemailer = require('nodemailer')
const regex = require('../client/src/regex')

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: process.env.SMTP_SECURE == 'true',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS
	},
	tls: {
		rejectUnauthorized: false
	}
})

router.post('/', (req, res) => {
	if (regex.email.test(req.body.email) && regex.telefone.test(req.body.telefone) && !!req.body.nome && !!req.body.mensagem) {
		const mailOptions = {
			from: `"${req.body.nome}" <${req.body.email}>`,
			to: process.env.SMTP_USER,
			replyTo: req.body.email,
			subject: 'Contato Labkids',
			html: `
			<p>
				<b>Nome:</b> ${req.body.nome}
			</p>
			<p>
				<b>E-mail:</b> ${req.body.email}
			</p>
			<p>
				<b>Telefone:</b> ${req.body.telefone}
			</p>
			<p>
				<b>Mensagem:</b><br>${req.body.mensagem}
			</p>
		`
		}
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) res.status(500).send(err.message)
			else res.end()
		})
	}
	else res.sendStatus(400)
})

module.exports = router