<template>
	<div class="save-manager-page">
		<PageWrapper>

			<div class="current-save-wrapper">
				<CurrentSaveFolder 
					:stats="folderStats"
					:location="folder"
				/>
			</div>

			<SaveProfilesList />
		</PageWrapper>
	</div>
</template>

<script>
	import util from 'util';
	import fs from 'fs';
	import du from 'du';

	import { mapState, mapActions } from 'vuex';
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