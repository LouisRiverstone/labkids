<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 v-for="(curso, i) in cursos" :key="i" d-flex>
				<v-card class="elevation-3">
					<v-img :aspect-ratio="3">
						<v-img :src="`${$gitdata}/${curso.icone}`" class="icon"></v-img>
					</v-img>
					<v-container>
						<p class="headline">{{curso.nome}}</p>
						{{curso.descricao}}
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
	</v-container>
</template>

<style>
.icon {
		width: 90px;
		height: 90px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -45px;
		margin-left: -45px;
	}
</style>

<script>
export default {
	data: () => ({
		cursos: [],
		loading: false,
		error: false,
		errorText: ''
	}),
	mounted() {
		this.loading = true
		this.$axios.get(`${this.$gitdata}/cursos.json`).then(response => {
			this.loading = false
			this.cursos = response.data.sort((a, b) => a.nome > b.nome)
		}).catch(err => {
			this.loading = false
			this.errorText = err.response ? err.response.data : err.message
			this.error = true
		})
	}
}
</script>
