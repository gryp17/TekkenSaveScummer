<template>
	<div id="app">
		<Header />
		<router-view class="page"></router-view>
	</div>
</template>

<script>
	import { remote, ipcRenderer } from 'electron';
	import Vue from 'vue';
	import { mapActions } from 'vuex';

	import Header from '@/components/Header';

	//common/global components
	import FormButton from '@/components/FormButton';

	Vue.component('FormButton', FormButton);

	export default {
		components: {
			Header
		},
		created() {
			//listen for the reset-app event
			ipcRenderer.on('reset-app', () => {
				this.onResetApp();
			});
		},
		methods: {
			...mapActions('save', [
				'resetApp'
			]),
			onResetApp() {
				const options = {
					type: 'question',
					message: 'Are you sure you want to reset the configuration?',
					detail: 'This action will delete all your backups.',
					buttons: [
						'OK',
						'Cancel'
					]
				};

				remote.dialog.showMessageBox(options).then(({ response }) => {
					//user has confirmed (clicked the first button)
					if (response === 0) {
						this.resetApp().then((success) => {
							if (success) {
								ipcRenderer.send('reload-app');
							} else {
								alert('Failed to reset the configuration');
							}
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	@font-face {
		font-family: "Roboto Mono";
		src: url(~@/assets/fonts/RobotoMono-Regular.woff2) format("woff2"),
			url(~@/assets/fonts/RobotoMono-Regular.woff) format("woff"),
			url(~@/assets/fonts/RobotoMono-Regular.ttf) format("truetype");
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
		font-family: "Roboto Mono";
		color: $text-color;

		:focus {
			outline: none;
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
