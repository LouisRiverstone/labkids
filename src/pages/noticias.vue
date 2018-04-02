<template>
	<v-container grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3 d-flex v-for="(noticia, i) in noticias" :key="i">
				<v-card class="elevation-3">
					<v-card-media class="elevation-2" :src="noticia.imagem" height="200"></v-card-media>
					<v-card-text>
						{{noticia.descricao}}
					</v-card-text>
					<v-card-actions v-if="noticia.link">
						<v-btn v-if="noticia.link" color="primary" :href="noticia.link" target="_blank">Mais detalhes</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		noticias: [
			{
				imagem: 'public/img/noticias/g1.jpg',
				descricao: 'IFB abre 100 vagas para cursos gratuitos de robótica e criação de jogos, no DF',
				link: 'https://g1.globo.com/df/distrito-federal/noticia/ifb-abre-100-vagas-para-cursos-gratuitos-de-robotica-e-criacao-de-jogos-no-df.ghtml'
			},
			{
				imagem: 'public/img/noticias/ifb.png',
				descricao: 'Abertas inscrições para cursos gratuitos de Educação Tecnológica para crianças',
				link: 'http://www.ifb.edu.br/taguatinga/16969-abertas-inscricoes-para-cursos-gratuitos-de-educacao-tecnologica-para-criancas'
			}
		]
	})
}
</script>
