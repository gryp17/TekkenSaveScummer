<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'tekken-save-scummer'
	};
</script>

<style lang="scss">

	@font-face {
		font-family: 'Roboto Mono';
		src:
			url(~@/assets/fonts/RobotoMono-Regular.woff2) format('woff2'),
			url(~@/assets/fonts/RobotoMono-Regular.woff) format('woff'),
			url(~@/assets/fonts/RobotoMono-Regular.ttf) format('truetype');
		font-weight: normal;
		font-style: normal;
	}

	body {
		background: $background;
		background-size: cover;
		font-family: 'Roboto Mono';
		color: $text-color;

		#wrapper {
			height: 400px;
			background-color: $overlay-background;
			color: $text-color;
		}
	}
</style>
