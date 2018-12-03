<template>
	<v-app>
		<v-toolbar color="primary" dark flat tabs fixed app>
			<v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>Labkids</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat v-for="(item, i) in menu" :key="i" :to="item.to" :href="item.href" :target="item.href ? '_blank' : '_self'" :disabled="item.disabled">{{item.title}}</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-bottom-sheet v-model="drawer">
			<v-list>
				<v-list-tile v-for="(item, i) in menu" :key="i" ripple :to="item.to" :href="item.href" :target="item.href ? '_blank' : '_self'" @click="drawer = false" :disabled="item.disabled">
					<v-list-tile-title>{{item.title}}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-bottom-sheet>
		<v-footer color="primary" dark height="auto" class="pa-2">
			<v-layout row wrap justify-center>
				<v-flex xs12 text-xs-center>
					<v-btn color="white" class="primary--text" href="https://www.facebook.com/labkids.br" target="_blank">
						<v-icon>mdi-facebook</v-icon>&nbsp;
						Facebook
					</v-btn>
					<v-btn color="white" class="primary--text" href="https://www.youtube.com/channel/UCtgw29LvoY_bpPUPXM4xVkw" target="_blank">
						<v-icon>mdi-play-circle</v-icon>&nbsp;
						Youtube
					</v-btn>
				</v-flex>
				<v-flex xs12 text-xs-center class="mt-2">
					&copy;{{year}} <strong>LABKIDS</strong> - <router-link class="white--text" to="/termos">Termos de uso</router-link>
				</v-flex>
			</v-layout>
		</v-footer>
		<v-dialog v-model="loading" persistent max-width="300">
			<loading></loading>
		</v-dialog>
		<v-snackbar color="error" v-model="error">{{errorText}}</v-snackbar>
	</v-app>
</template>

<script>
export default {
	data: () => ({
		loading: false,
		error: false,
		errorText: '',
		drawer: false,
		dark: false,
		inscricoes: {},
		menu: [
			{
				title: 'Classificados',
				href: 'https://cdn.rawgit.com/samuelnovaes/labkids-dados/master/lista.pdf'
			},
			{
				title: 'Sobre',
				to: '/sobre'
			},
			{
				title: 'Notícias',
				href: 'https://www.facebook.com/labkids.br'
			},
			{
				title: 'Cursos',
				to: '/cursos'
			},
			{
				title: 'Equipe',
				to: '/equipe'
			},
			{
				title: 'Inscrições'
			},
			{
				title: 'Galeria',
				to: '/galeria/1'
			},
			{
				title: 'Contato',
				to: '/contato'
			}
		]
	}),
	mounted() {
		this.dark = localStorage.dark ? JSON.parse(localStorage.dark) : false
		this.loading = true
		this.$axios.get(`${this.$gitdata}/inscricoes.json`)
			.then(response => {
				this.loading = false
				const i = this.menu.find(x => x.title == 'Inscrições')
				i.disabled = !response.data.abertas
				i.href = response.data.url
			})
			.catch(err => {
				this.loading = false
				this.errorText = err.response ? err.response.data : err.message
				this.error = true
			})
	},
	computed: {
		year() {
			return new Date().getFullYear()
		}
	}
}
</script>
