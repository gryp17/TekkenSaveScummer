<template>
	<div class="save-manager-page">
		<PageWrapper v-if="folderStats">

			<div class="current-save-wrapper">
				<CurrentSaveFolder
					:stats="folderStats"
					:location="folder"
				/>
			</div>

			<SaveProfilesList @make-backup="makeBackup"/>
		</PageWrapper>
	</div>
</template>

<script>
	import util from 'util';
	import path from 'path';
	import fs from 'fs';
	import du from 'du';
	import { ncp } from 'ncp';
	import { ipcRenderer } from 'electron';
	import { mapState, mapActions } from 'vuex';

	import config from '@/config';
	import PageWrapper from '@/components/PageWrapper';
	import CurrentSaveFolder from '@/components/CurrentSaveFolder';
	import SaveProfilesList from '@/components/SaveProfilesList';

	const stat = util.promisify(fs.stat);

	export default {
		components: {
			PageWrapper,
			CurrentSaveFolder,
			SaveProfilesList
		},
		computed: {
			...mapState('save', [
				'folder',
				'folderStats'
			])
		},
		created() {
			this.getFolderStats();

			//reset the vuex store state
			ipcRenderer.on('reset-state', () => {
				this.resetState();
			});
		},
		methods: {
			...mapActions('save', [
				'resetState',
				'setFolderStats',
				'addBackup'
			]),
			goToInitialConfig() {
				this.$router.push({
					name: 'initial-config'
				});
			},
			getFolderStats() {
				if (!this.folder) {
					this.goToInitialConfig();
					return;
				}

				Promise.all([
					stat(this.folder),
					du(this.folder)
				]).then((results) => {
					const stats = results[0];
					const sizeInMB = ((results[1] / 1024) / 1024).toFixed(2);

					const folderStats = {
						name: this.folder.split('\\').pop(),
						created: stats.birthtime,
						//TODO: this will probably need to check the inner files as well
						modified: stats.mtime,
						size: sizeInMB
					};

					this.setFolderStats(folderStats);
				}).catch((err) => {
					this.goToInitialConfig();
				});
			},
			makeBackup(profile) {
				fs.mkdir(config.backupsDir, (err) => {
					if (err && err.code !== 'EEXIST') {
						alert('Failed to make backup');
						return;
					}

					const date = Date.now();
					const folderName = `${profile}_${date}`;

					ncp(this.folder, path.join(config.backupsDir, folderName), (err) => {
						if (err) {
							alert('Failed to make backup');
						} else {
							//insert the vuex record with the selected profile and save folder name
							const backup = {
								profile,
								folderName,
								modified: this.folderStats.modified
							};

							this.addBackup(backup);
						}
					});
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.save-manager-page {
		.page-wrapper {
			display: flex;
			flex-direction: column;
		}

		.current-save-wrapper {
			margin-top: 5px;
			text-align: center;
		}
	}
</style>
