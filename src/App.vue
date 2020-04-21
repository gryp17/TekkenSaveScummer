<template>
	<div id="app">
		<PageWrapper>
			<Header />
			<router-view class="page"></router-view>
		</PageWrapper>
	</div>
</template>

<script>
	import { remote, ipcRenderer } from 'electron';
	import Vue from 'vue';
	import { mapActions } from 'vuex';

	import PageWrapper from '@/components/PageWrapper';
	import Header from '@/components/Header';

	//common/global components
	import FormButton from '@/components/FormButton';

	Vue.component('FormButton', FormButton);

	export default {
		components: {
			PageWrapper,
			Header
		},
		created() {
			ipcRenderer.on('show-faq', () => {
				this.openFAQ();
			});

			ipcRenderer.on('reset-app', () => {
				this.onResetApp();
			});
		},
		methods: {
			...mapActions('save', [
				'resetApp'
			]),
			/**
			 * Opens the FAQ message box
			 */
			openFAQ() {
				const detail = `Q: My save game gets overwritten every time I start the game?

					A: If you have Steam cloud enabled Steam will overwrite any changes to the backup directory made by this tool. You need to disable Steam cloud save.
				`;

				const options = {
					type: 'question',
					message: 'FAQ',
					detail,
					buttons: [
						'Close'
					]
				};

				remote.dialog.showMessageBox(options);
			},
			/**
			 * Opens the reset app confirmation dialog and resets the app state
			 */
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
