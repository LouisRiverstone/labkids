<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 md6 offset-md3 v-for="(termo, i) in termos" :key="i">
				<v-card class="elevation-3">
					<v-card-title>
						<span class="headline">{{termo.titulo}}</span>
					</v-card-title>
					<v-card-text v-html="termo.corpo"></v-card-text>
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
			termos: [],
			loading: false,
			error: false,
			errorText: ''
		}),
		mounted(){
			this.loading = true
			this.$axios.get(`${this.$gitdata}/termos.json`)
			.then(response => {
				this.loading = false
				this.termos = response.data
			})
			.catch(err => {
				this.loading = false
				this.errorText = err.response ? err.response.data : err.message
				this.error = true
			})
		}
	}
</script>
