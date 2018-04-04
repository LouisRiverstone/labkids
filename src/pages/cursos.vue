<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 v-for="(curso, i) in cursos" :key="i">
				<v-card class="elevation-3">
					<v-card-media contain class="elevation-2" :src="`${$gitdata}/${curso.icone}`" height="200"></v-card-media>
					<v-card-title>
						<div class="headline">{{curso.nome}}</div>
					</v-card-title>
					<v-card-text>
						{{curso.descricao}}
					</v-card-text>
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
export default {
	data: () => ({
		cursos: [],
		loading: false,
		error: false,
		errorText: ''
	}),
	mounted(){
		this.loading = true
		this.$axios.get(`${this.$gitdata}/cursos.json`)
		.then(response => {
			this.loading = false
			this.cursos = response.data.sort((a, b) => a.nome > b.nome)
		})
		.catch(err => {
			this.loading = false
			this.errorText = err.response ? err.response.data : err.message
			this.error = true
		})
	}
}
</script>
