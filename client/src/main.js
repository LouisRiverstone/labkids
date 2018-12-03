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
	routes,
	mode: 'history'
})

Vue.use(VueRouter)

Vue.use(Vuetify, {
	theme: {
		primary: '#AB37C8',
		secondary: '#E1BEE7',
		footer: '#AB37C8'
	}
})

Vue.use({
	install(V, O) {
		V.prototype.$axios = axios
		V.prototype.$gitdata = 'http://samuelnovaes.ml/labkids-dados'
	}
})

Vue.component('loading', Loading)
Vue.component('player', Player)

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
