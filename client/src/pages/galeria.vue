<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 xl2 v-for="(foto, i) in fotos" :key="i">
				<v-img :src="foto.url_s" :aspect-ratio="16/9" @click.native="openFile(foto)" class="elevation-3 thumbnail">
					<img v-if="foto.media == 'video'" src="/assets/img/play.png" class="play">
				</v-img>
			</v-flex>
		</v-layout>
		<v-layout column align-center v-if="pages > 1">
			<v-flex>
				<v-btn color="primary" :disabled="pageLabel <= 1" @click="prev">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-chip>{{pageLabel}}</v-chip>
				<v-btn color="primary" :disabled="pageLabel >= pages" @click="next">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</v-flex>
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
	.thumbnail {
		cursor: pointer;
	}
</style>

<script>
export default {
	data: () => ({
		fotos: [],
		foto: null,
		page: 1,
		oldpage: 1,
		pages: 0,
		error: false,
		errorText: '',
		loading: false
	}),
	mounted() {
		this.page = parseInt(this.$route.params.page)
		this.pageLabel = this.page
		this.update()
	},
	methods: {
		update() {
			this.loading = true
			this.$axios.get(`/api/galeria/${this.page}`)
				.then(response => {
					this.pages = response.data.photos.pages
					this.fotos = response.data.photos.photo
					this.loading = false
					window.scrollTo(0, 0)
					this.$router.push(`/galeria/${this.page}`)
					this.pageLabel = this.page
				})
				.catch(err => {
					this.loading = false
					this.page = this.oldpage
					this.errorText = err.response ? err.response.data : err.message
					this.error = true
				})
		},
		openFile(file) {
			this.foto = file
			this.$nextTick(() => {
				this.$refs.player.loadMedia()
			})
		},
		prev() {
			this.oldpage = this.page
			this.page--
			this.update()
		},
		next() {
			this.oldpage = this.page
			this.page++
			this.update()
		}
	}
}
</script>
