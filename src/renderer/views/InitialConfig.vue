<template>
	<div class="initial-config-page">
		<PageWrapper v-show="!loading">
			<div v-if="saveFound">
				Save found at {{ defaultSaveLocation }}
			</div>
			<div class="save-not-found" v-else>
				<i class="fas fa-exclamation-triangle"></i>

				<h3>
					No tekken save was found
				</h3>

				<p>
					Please specify the tekken save location.
					<br />
					<span class="small">
						(The default location is {{ defaultSaveLocation }})
					</span>
				</p>

				<FormButton>
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

	import PageWrapper from '@/components/PageWrapper';

	//all those need to be moved to a config
	const homeDir = remote.app.getPath('home');
	const localSubdir = '/AppData/Local/';
	const tekkenFolder = 'TekkenGame';

	export default {
		components: {
			PageWrapper
		},
		data() {
			return {
				loading: true,
				saveFound: false,
				defaultSaveLocation: path.join(homeDir, localSubdir, tekkenFolder)
			};
		},
		created() {
			this.directoryExists(this.defaultSaveLocation).then((exists) => {
				this.saveFound = exists;
				this.loading = false;
			});

			/*
			//TODO: check if the save location/config is OK and redirect to the save manager
			setTimeout(() => {
				this.$router.push({
					name: 'save-manager'
				});
			}, 5000);
			*/
		},
		methods: {
			directoryExists(directory) {
				const stat = util.promisify(fs.stat);

				return stat(directory).then((stats) => {
					return stats && stats.isDirectory();
				}).catch(() => {
					return false;
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