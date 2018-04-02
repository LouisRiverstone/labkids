<template>
	<v-app :dark="dark">
		<v-toolbar color="primary" dark flat tabs fixed app>
			<v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-avatar>
				<img src="public/img/logo.png" class="logo" />
			</v-avatar>
			<v-toolbar-title>{{$route.name}}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat v-for="(item, i) in menu" :key="i" :to="item.to" :href="item.href" target="_blank">{{item.title}}</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-bottom-sheet v-model="drawer">
			<v-list>
				<v-list-tile v-for="(item, i) in menu" :key="i" ripple :to="item.to" :href="item.href" target="_blank" @click="drawer = false">
					<v-list-tile-title>{{item.title}}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-bottom-sheet>
		<v-footer dark height="auto" class="pa-2">
			<v-layout row wrap justify-center>
				<v-flex xs12 text-xs-center>
					<v-btn color="secondary" href="https://www.facebook.com/labkids.br" target="_blank">
						<v-icon>mdi-facebook</v-icon>&nbsp;
						Facebook
					</v-btn>
					<v-btn color="secondary" href="https://www.youtube.com/channel/UCtgw29LvoY_bpPUPXM4xVkw" target="_blank">
						<v-icon>mdi-play-circle</v-icon>&nbsp;
						Youtube
					</v-btn>
					<v-btn color="secondary" @click="toggleTheme">
						<v-icon>mdi-theme-light-dark</v-icon>&nbsp;
						Tema
					</v-btn>
				</v-flex>
				<v-flex xs12 text-xs-center class="mt-2">
					&copy;{{year}} <strong>LABKIDS</strong>
				</v-flex>
			</v-layout>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: false,
		dark: false,
		menu: [
			{
				title: 'Sobre',
				to: '/sobre'
			},
			{
				title: 'Notícias',
				to: '/noticias'
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
				title: 'Inscrições',
				href: 'https://doity.com.br/labkids'
			},
			{
				title: 'Galeria',
				to: '/galeria'
			},
			{
				title: 'Contato',
				to: '/contato'
			}
		]
	}),
	mounted(){
		this.dark = JSON.parse(localStorage.dark) || false
	},
	methods: {
		toggleTheme(){
			this.dark = !this.dark
			localStorage.dark = this.dark
		}
	},
	computed: {
		year(){
			return new Date().getFullYear()
		}
	}
}
</script>

<style>
.fontlab {
	font-family: funhouse;
}
.logo {
	border: 1px solid #fff;
}
</style>
