import sobre from './pages/sobre.vue'
import cursos from './pages/cursos.vue'
import contato from './pages/contato.vue'
import galeria from './pages/galeria.vue'
import equipe from './pages/equipe.vue'
import termos from './pages/termos.vue'

export default [
	{ path: '/', redirect: '/sobre' },
	{ path: '/sobre', component: sobre },
	{ path: '/cursos', component: cursos },
	{ path: '/contato', component: contato },
	{ path: '/equipe', component: equipe },
	{ path: '/galeria/:page', component: galeria },
	{ path: '/termos', component: termos }
]
