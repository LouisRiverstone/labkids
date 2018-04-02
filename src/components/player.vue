<template>
	<div v-if="opened" class="black">
		<v-toolbar ref="toolbar" color="primary" dark>
			<v-toolbar-title>{{foto.title}}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="close">
				<v-icon>close</v-icon>
			</v-btn>
		</v-toolbar>
		<video
		:autoplay="autoplay"
		:controls="controls"
		:src="url"
		:poster="poster"
		class="media"
		ref="media"
		:style="{height: `calc(100% - ${toolbarHeight}px)`}" />
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
	</div>
</template>

<style scoped>
.black {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000 !important;
	z-index: 2;
}
.media {
	width: 100%;
}
</style>

<script>
export default {
	props: ['foto'],
	data: () => ({
		opened: true,
		controls: false,
		url: null,
		autoplay: false,
		poster: null,
		loading: false,
		error: false,
		errorText: '',
		toolbarHeight: 0
	}),
	methods: {
		close(){
			this.opened = false
		},
		loadMedia(){
			this.poster = this.foto.url_o
			this.opened = true
			if(this.foto.media == 'video'){
				this.loading = true
				this.$axios.get(`${this.$server}/galeria/foto/${this.foto.id}`)
				.then(response => {
					this.loading = false
					this.controls = true
					this.autoplay = true
					this.url = response.data.sizes.size.find(x => x.label == 'Site MP4').source
				})
				.catch(err => {
					this.loading = false
					this.errorText = err.response.data
					this.error = true
				})
			}
			else {
				this.url = null
				this.controls = false
				this.autoplay = false
			}
			this.$nextTick(() => {
				this.toolbarHeight = this.$refs.toolbar.$el.offsetHeight
			})
		}
	}
}
</script>
