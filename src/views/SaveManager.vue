<template>
	<div class="save-manager-page">
		<template v-if="folderStats">
			<div class="current-save-wrapper">
				<CurrentSaveFolder
					:stats="folderStats"
					:location="folder"
				/>
			</div>

			<SaveProfilesList />
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import CurrentSaveFolder from '@/components/CurrentSaveFolder';
	import SaveProfilesList from '@/components/SaveProfilesList';

	export default {
		components: {
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
			this.getSaveFolderStats().then((stats) => {
				if (!stats) {
					this.goToInitialConfig();
				}
			});
		},
		methods: {
			...mapActions('save', [
				'getSaveFolderStats'
			]),
			/**
			 * Redirects to the initial config page/view
			 */
			goToInitialConfig() {
				this.$router.push({
					name: 'initial-config'
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.save-manager-page {
		.current-save-wrapper {
			margin-top: 5px;
			text-align: center;
		}
	}
</style>
