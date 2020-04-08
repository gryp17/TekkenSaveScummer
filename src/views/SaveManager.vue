<template>
	<div class="save-manager-page">
		<PageWrapper v-if="folderStats">
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
