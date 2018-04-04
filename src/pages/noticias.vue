<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 v-for="(noticia, i) in noticias" :key="i">
				<v-card class="elevation-3">
					<v-card-media v-if="noticia.attachments && noticia.attachments.data[0].media" class="elevation-2" :src="noticia.attachments.data[0].media.image.src" height="200"></v-card-media>
					<v-card-text>
						{{noticia.message || noticia.attachments.data[0].description || noticia.attachments.data[0].title | shortlink}}
					</v-card-text>
					<v-card-actions v-if="noticia.attachments && noticia.attachments.data[0].url">
						<v-btn color="primary" :href="noticia.attachments.data[0].url" target="_blank">Mais detalhes</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout column align-center v-if="paging.next || paging.previous">
			<v-flex>
				<v-btn color="primary" :disabled="!paging.previous" @click="prev(paging.previous)">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-chip>{{page}}</v-chip>
				<v-btn color="primary" :disabled="!paging.next" @click="next(paging.next)">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
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
		noticias: [],
		paging: {},
		loading: false,
		error: false,
		errorText: '',
		page: 1,
		oldpage: 1
	}),
	mounted(){
		this.update('https://graph.facebook.com/v2.12/labkids.br/feed?fields=attachments,message&access_token=EAAAAUaZA8jlABAII1nwy9WXtZBYkTfZCPxdi1sPY2yhDqFAbCYkVfAmzdAA4MPTYsium6dY2cJBZCf1N93sxNwmtY5FqZCjnUA1KTPC9v65aNMG5pRcbC5PsXpWsimKpaDbYEufg5gkgQcJIMTMbKxZAlq5qZANAwmWiv45rZALFhgZDZD')
	},
	methods: {
		update(url){
			this.loading = true
			this.$axios.get(url)
			.then(response => {
				this.loading = false
				this.noticias = response.data.data
				this.paging = response.data.paging
				window.scrollTo(0, 0)
			})
			.catch(err => {
				this.loading = false
				this.page = this.oldpage
				this.errorText = err.response ? err.response.data : err.message
				this.error = true
			})
		},
		prev(url){
			this.oldpage = this.page
			this.page--
			this.update(url)
		},
		next(url){
			this.oldpage = this.page
			this.page++
			this.update(url)
		}
	},
	filters: {
		shortlink(v){
			let length = 32
			return v ? v.replace(/https?:\/\/[^\s]+/g, m => {
				return m.length > length ? m.substr(0, length) + '...' : m
			}) : v
		}
	}
}
</script>
