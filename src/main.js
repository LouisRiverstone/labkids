import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './routes.js'

import Loading from './components/loading.vue'
import Player from './components/player.vue'

import 'vuetify/dist/vuetify.css'

let router = new VueRouter({
	routes
})

Vue.use(VueRouter)

Vue.use(Vuetify, {
	theme: {
		primary: '#AB37C8',
		secondary: '#7C2892',
		footer: '#AB37C8'
	}
})

Vue.use({
	install(V, O) {
		V.prototype.$axios = axios
		//V.prototype.$server = 'http://localhost:3000/api'
		V.prototype.$server = 'https://labkids.bsb.br/api'
		V.prototype.$gitdata = 'https://cdn.rawgit.com/samuelnovaes/labkids-dados/master'
	}
})

Vue.component('loading', Loading)
Vue.component('player', Player)

let vm = new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
