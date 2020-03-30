<template>
	<div class="initial-config-page">
		<PageWrapper>
			initial config page
		</PageWrapper>
	</div>
</template>

<script>
	import PageWrapper from '@/components/PageWrapper';

	export default {
		components: {
			PageWrapper
		},
		created() {
			//TODO: check if the save location/config is OK and redirect to the save manager
			setTimeout(() => {
				this.$router.push({
					name: 'save-manager'
				});
			}, 5000);
		}
	};
</script>