<template>
	<div>
		<v-img :src="`${$gitdata}/img/cover.jpg`" :aspect-ratio="16/5">
			<v-layout column align-center justify-center fill-height>
				<v-avatar size="300px" class="mt-5 mb-5">
					<v-img src="/assets/img/logo.png"></v-img>
				</v-avatar>
			</v-layout>
		</v-img>
		<v-container v-if="vakinha.aberta">
			<v-card class="elevation-5">
				<v-container>
					<v-layout row wrap grid-list-xl>
						<v-flex sm3 class="hidden-xs-only">
							<v-img src="/assets/img/donate.png" aspect-ratio="1"></v-img>
						</v-flex>
						<v-flex xs12 sm9>
							<p>
								O LABKIDS FESTIVAL precisa da sua ajuda para promover o trabalho de crianças de 8 a 12 anos realizado nos cursos do projeto. Nossa campanha de financiamento coletivo foi criada para reunir as pessoas que querem colaborar com as ações do evento. Confira e não deixe de participar.
							</p>
							<p>
								O doador receberá as seguintes recompensas:
								<ul>
									<li v-for="(recompensa, i) in vakinha.recompensas" :key="i">A partir de {{recompensa.valor}} reais: {{recompensa.recompensa}}</li>
								</ul>
							</p>
							<p>
								Os brindes poderão ser retirados no dia do evento ({{vakinha.dataFestival}}) sem custo, na recepção do LabKids Festival.
							</p>
							<v-btn color="primary" :href="vakinha.url" target="_blank">Doar</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card>
		</v-container>
		<v-container grid-list-lg>
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 v-for="(valor, i) in valores" :key="i" d-flex>
					<v-card class="elevation-5">
						<v-toolbar color="primary" dark>
							<v-toolbar-title>{{valor.nome}}</v-toolbar-title>
						</v-toolbar>
						<v-container>
							<ul v-if="Array.isArray(valor.descricao)">
								<li v-for="(item, i) in valor.descricao" :key="i">{{item}}</li>
							</ul>
							<p v-else class="texto-valor">{{valor.descricao}}</p>
						</v-container>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
	</div>
</template>

<style scoped>
	.texto-valor {
		text-align: justify;
	}
</style>

<script>
export default {
	data: () => ({
		vakinha: {},
		valores: [],
		loading: false,
		error: false,
		errorText: ''
	}),
	mounted() {
		this.loading = true
		this.$axios.get(`${this.$gitdata}/valores.json`)
			.then(response => {
				this.valores = response.data
				this.$axios.get(`${this.$gitdata}/vakinha.json`).then(response => {
					this.loading = false
					this.vakinha = response.data
				}).catch(err => {
					this.loading = false
					this.errorText = err.response ? err.response.data : err.message
					this.error = true
				})
			})
			.catch(err => {
				this.loading = false
				this.errorText = err.response ? err.response.data : err.message
				this.error = true
			})
	}
}
</script>
