<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 v-for="(pessoa, i) in equipe" :key="i">
				<v-card class="elevation-3">
					<v-card-media class="elevation-2" :src="`${$gitdata}/${pessoa.foto}`" height="200"></v-card-media>
					<v-card-text>
						<span class="headline">{{pessoa.nome}}</span>
						<br>
						{{pessoa.funcao}}
					</v-card-text>
					<v-expansion-panel v-if="pessoa.descricao || pessoa.link">
						<v-expansion-panel-content>
							<div slot="header">Mais detalhes</div>
							<v-card>
								<v-card-text>{{pessoa.descricao}}</v-card-text>
								<v-card-actions v-if="pessoa.link">
									<v-btn color="primary" :href="pessoa.link" target="_blank">Website</v-btn>
								</v-card-actions>
							</v-card>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-card>
			</v-flex>
		</v-layout>
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
	</v-container>
</template>

<style scoped>
.funcao {
	color: "#333"
}
</style>

<script>
export default {
	data: () => ({
		equipe: [],
		loading: false,
		error: false,
		errorText: ''
	}),
	mounted(){
		this.loading = true
		this.$axios.get(`${this.$gitdata}/equipe.json`)
		.then(response => {
			this.loading = false
			this.equipe = response.data
		})
		.catch(err => {
			this.loading = false
			this.errorText = err.response ? err.response.data : err.message
			this.error = true
		})
	}
}
</script>
