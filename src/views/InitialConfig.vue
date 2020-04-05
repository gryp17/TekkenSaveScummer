<template>
	<div class="initial-config-page">
		<PageWrapper v-show="!loading">
			<div class="save-not-found">
				<i class="fas fa-exclamation-triangle"></i>

				<h3>
					No tekken save was found
				</h3>

				<p>
					Please specify the tekken save location.
					<br />
					<span class="small">
						(Default location: {{ defaultSaveLocation }})
					</span>
				</p>

				<FormButton @click="openSaveLocationDialog">
					<i class="far fa-folder-open"></i>
					Select save folder
				</FormButton>
			</div>
		</PageWrapper>
	</div>
</template>

<script>
	import util from 'util';
	import path from 'path';
	import fs from 'fs';
	import { remote } from 'electron';
	import { mapState, mapActions } from 'vuex';
	import config from '@/config';

	import PageWrapper from '@/components/PageWrapper';

	const stat = util.promisify(fs.stat);
	const { homeDir, localSubdir, defaultSaveLocation } = config;

	export default {
		components: {
			PageWrapper
		},
		data() {
			return {
				loading: true,
				defaultSaveLocation
			};
		},
		computed: {
			...mapState('save', [
				'folder'
			])
		},
		created() {
			//check the store folder or the default save location for the save folder
			const saveDirectory = this.folder || this.defaultSaveLocation;

			this.directoryExists(saveDirectory).then((exists) => {
				this.loading = false;

				if (exists) {
					this.setSaveFolder(saveDirectory);
					this.goToSaveManager();
				}
			});
		},
		methods: {
			...mapActions('save', [
				'setSaveFolder'
			]),
			directoryExists(directory) {
				return stat(directory).then((stats) => {
					return stats && stats.isDirectory();
				}).catch(() => {
					return false;
				});
			},
			goToSaveManager() {
				this.$router.push({
					name: 'save-manager'
				});
			},
			openSaveLocationDialog() {
				const options = {
					defaultPath: path.join(homeDir, localSubdir),
					properties: [
						'openDirectory'
					]
				};

				remote.dialog.showOpenDialog(options).then(({ canceled, filePaths }) => {
					if (canceled || !filePaths) {
						return;
					}

					const saveFolder = filePaths[0];
					this.setSaveFolder(saveFolder);
					this.goToSaveManager();
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.initial-config-page {

		.page-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.save-not-found {
			text-align: center;

			.fa-exclamation-triangle {
				font-size: 60px;
			}

			.small {
				font-size: 13px;
			}
		}
	}
</style>
