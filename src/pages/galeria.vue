<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 v-for="(foto, i) in fotos" :key="i">
				<v-card ripple @click.native="openFile(foto)" class="elevation-3">
					<v-card-media class="elevation-2" :src="foto.url_s" height="200">
						<img v-if="foto.media == 'video'" src="public/img/play.png" class="play">
					</v-card-media>
					<v-card-text>
						<span class="headline">{{foto.title}}</span>
						<br>
						{{foto.description._content}}
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout column align-center>
			<v-pagination :length="pages" v-model="page" @input="setPage" :total-visible="7"></v-pagination>
		</v-layout>
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
		<player v-if="foto" :foto="foto" ref="player"></player>
	</v-container>
</template>

<style scoped>
	.play {
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
		fotos: [],
		foto: null,
		pages: 0,
		page: 1,
		error: false,
		errorText: '',
		loading: false,
		player: false
	}),
	mounted(){
		this.update()
	},
	methods: {
		setPage(){
			this.update()
		},
		update(){
			this.loading = true
			this.$axios.get(`${this.$server}/galeria/${this.page}`)
			.then(response => {
				this.pages = response.data.photos.pages
				this.fotos = response.data.photos.photo
				this.loading = false
			})
			.catch(err => {
				this.errorText = err.response.data
				this.error = true
				this.loading = false
			})
		},
		openFile(file){
			this.foto = file
			this.player = true
			this.$nextTick(() => {
				this.$refs.player.loadMedia()
			})
		}
	}
}
</script>
