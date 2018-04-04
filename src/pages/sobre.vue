<template>
	<div>
		<v-jumbotron app height="auto" :src="`${$gitdata}/img/cover.jpg`" dark>
			<v-layout column align-center>
				<v-avatar size="300px" class="mt-5 mb-5">
					<img src="public/img/logo.png">
				</v-avatar>
			</v-layout>
		</v-jumbotron>
		<v-container grid-list-lg>
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 v-for="(item, i) in items" :key="i">
					<img :src="`${$gitdata}/${item}`" class="img_sobre">
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
	.img_sobre {
		width: 100%;
	}
</style>

<script>
export default {
	data: () => ({
		items: [],
		loading: false,
		error: false,
		errorText: ''
	}),
	mounted(){
		this.loading = true
		this.$axios.get(`${this.$gitdata}/sobre.json`)
		.then(response => {
			this.loading = false
			this.items = response.data
		})
		.catch(err => {
			this.loading = false
			this.errorText = err.response ? err.response.data : err.message
			this.error = true
		})
	}
}
</script>
