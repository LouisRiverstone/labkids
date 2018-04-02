<template>
	<div>
		<v-jumbotron app height="auto" src="public/img/bg.jpg" gradient="to top, rgba(0, 0, 0, 0), #AB37C8" dark>
			<v-layout column align-center>
				<v-avatar size="300px" class="mt-5 mb-5">
					<img src="public/img/logo.png" class="logo">
				</v-avatar>
			</v-layout>
		</v-jumbotron>
		<v-container grid-list-lg>
			<v-layout row wrap>
				<v-flex xs12 sm6 md4>
					<img src="public/img/sobre/missao.png" class="img_sobre">
				</v-flex>
				<v-flex xs12 sm6 md4>
					<img src="public/img/sobre/visao.png" class="img_sobre">
				</v-flex>
				<v-flex xs12 sm6 md4>
					<img src="public/img/sobre/valores.png" class="img_sobre">
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<style scoped>
	.img_sobre {
		width: 100%;
	}
</style>
