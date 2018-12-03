<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 md6 xl4 offset-md3 offset-xl4>
				<v-card v-if="success" class="elevation-3">
					<v-alert color="success" icon="check" value="true">Mensagem enviada! Entraremos em contato em breve.</v-alert>
					<v-card-actions>
						<v-btn color="primary" @click="novaMensagem">Enviar outra</v-btn>
					</v-card-actions>
				</v-card>
				<v-card v-else class="elevation-3">
					<v-toolbar color="primary" dark>
						<v-toolbar-title>Mensagem</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form ref="form" @submit="enviar">
							<v-text-field prepend-icon="mdi-account" required v-model="nome" :rules="[rules.required]" label="Nome"></v-text-field>
							<v-text-field prepend-icon="mdi-email" required v-model="email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>
							<v-text-field prepend-icon="mdi-phone" v-model="telefone" mask="###########" :rules="[rules.telefone]" label="Telefone"></v-text-field>
							<v-textarea prepend-icon="mdi-message-text" required v-model="mensagem" :rules="[rules.required]" label="Mensagem"></v-textarea>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" @click="enviar">Enviar</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
	</v-container>
</template>

<script>
import regex from '../regex.js'
export default {
	data: () => ({
		error: false,
		success: false,
		errorText: '',
		loading: false,
		nome: '',
		email: '',
		telefone: '',
		mensagem: '',
		rules: {
			required: v => !!v || 'Campo obrigatório!',
			email: v => regex.email.test(v) || 'E-mail inválido!',
			telefone: v => regex.telefone.test(v) || 'Telefone inválido!'
		}
	}),
	methods: {
		enviar() {
			if (this.$refs.form.validate()) {
				this.loading = true
				this.$axios.post(`/api/mensagem`, {
					nome: this.nome,
					email: this.email,
					telefone: this.telefone,
					mensagem: this.mensagem
				}).then(() => {
					this.success = true
					this.loading = false
				}).catch(err => {
					this.errorText = err.response.data
					this.error = true
					this.loading = false
				})
			}
		},
		novaMensagem() {
			this.mensagem = ''
			this.success = false
		}
	}
}
</script>
