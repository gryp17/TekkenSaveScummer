<template>
	<div class="save-profiles-list">
		<div v-for="(profile, index) in profiles" :key="index" class="column">
			<input
				:value="profile.name"
				@input="onNameChange($event, index)"
				title="Edit save slot name"
				placeholder="Save slot name"
				type="text"
				class="title"
			/>

			<hr />

			<FormButton @click="onMakeBackup(index)" class="backup-btn">
				<i class="fas fa-plus"></i>
				Make backup
			</FormButton>

			<div v-for="backup in profile.backups" :key="backup.folder" class="backup">
				{{ backup.folder }}
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		computed: {
			...mapState('save', [
				'profiles'
			])
		},
		methods: {
			...mapActions('save', [
				'makeBackup',
				'setProfileName'
			]),
			onMakeBackup(profile) {
				this.makeBackup(profile).then((backup) => {
					if (!backup) {
						alert('Failed to make backup');
					}
				});
			},
			onNameChange(e, profile) {
				this.setProfileName({
					profile,
					name: e.target.value
				});
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
				display: block;
				width: 100%;
				padding: 4px 0px;
				text-align: center;
				border: none;
				background-color: transparent;
				color: $text-color;
				font-size: 15px;
				cursor: pointer;

				&:hover, &:focus {
					background-color: $white;
					color: $very-dark-blue;
				}
			}

			hr {
				margin-top: 4px;
				margin-bottom: 0px;
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
