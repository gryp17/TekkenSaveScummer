<template>
	<div id="app">
		<Header />
		<router-view class="page"></router-view>
	</div>
</template>

<script>
	import Vue from 'vue';

	import Header from '@/components/Header';

	//common/global components
	import FormButton from '@/components/FormButton';

	Vue.component('FormButton', FormButton);

	export default {
		components: {
			Header
		}
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

	body, html {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	body {
		background: $background;
		background-size: cover;
		font-family: 'Roboto Mono';
		color: $text-color;

		:focus {
			outline:none;
		}

		::-moz-focus-inner {
			border: 0;
		}

		button:focus {
			outline: none;
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}

		.page {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 10px;
		}
	}
</style>
