<template>
	<div class="save-profiles-list">
		<div class="column">
			<div class="title">
				Main
			</div>

			<FormButton @click="makeBackup(0)" class="backup-btn">
				<i class="fas fa-plus"></i>
				Make backup
			</FormButton>
		</div>
		<div class="column">
			<div class="title">
				Smurf
			</div>
		</div>
		<div class="column">
			<div class="title">
				Third
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			makeBackup(profile) {
				this.$emit('make-backup', profile);
			}
		}
	};
</script>

<style scoped lang="scss">
	.save-profiles-list {
		display: flex;
		flex: 1;
		margin-top: 10px;

		.column {
			flex: 1;
			padding: 5px;

			.title {
				padding: 5px 0px;
				text-align: center;
				border-bottom: solid 1px $blue;
			}

			.backup-btn {
				margin-top: 5px;
				width: 100%;
				background-color: transparent;
				border: solid 3px rgba($white, 0.6);

				&:hover {
					border-color: $white;
				}
			}
		}
	}
</style>
