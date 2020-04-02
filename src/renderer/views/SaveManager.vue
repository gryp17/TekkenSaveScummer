<template>
	<div class="save-manager-page">
		<PageWrapper>

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
	import { mapState, mapActions } from 'vuex';

	import config from '@/config';
	import PageWrapper from '@/components/PageWrapper';
	import CurrentSaveFolder from '@/components/CurrentSaveFolder';
	import SaveProfilesList from '@/components/SaveProfilesList';
	
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
		},
		methods: {
			...mapActions('save', [
				'setFolderStats'
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

				const stat = util.promisify(fs.stat);

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
				}).catch(() => {
					this.goToInitialConfig();
				});
			},
			makeBackup() {
				const date = Date.now();

				//TODO:
				//create the /backups/ subdirectory if it doesn't exist

				ncp(this.folder, path.join(config.appDir, '/backups/', date.toString()), (err) => {
					if (err) {
						alert('Failed to make backup');
					} else {
						//TODO:
						//insert the vuex record with the selected profile and save folder name
					}
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