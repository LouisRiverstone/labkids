import sobre from './pages/sobre.vue'
import cursos from './pages/cursos.vue'
import contato from './pages/contato.vue'
import galeria from './pages/galeria.vue'
import equipe from './pages/equipe.vue'
import termos from './pages/termos.vue'

export default [
	{ path: '/', redirect: '/sobre' },
	{ path: '/sobre', component: sobre, name: 'Sobre' },
	{ path: '/cursos', component: cursos, name: 'Cursos' },
	{ path: '/contato', component: contato, name: 'Contatos' },
	{ path: '/equipe', component: equipe, name: 'Equipe' },
	{ path: '/galeria', component: galeria, name: 'Galeria' },
	{ path: '/termos', component: termos, name: 'Termos de uso' }
]