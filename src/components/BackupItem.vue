<template>
	<div class="backup-item">
		<div class="header">
			<div class="row">
				Backed up
				<span :title="created" class="info">
					{{ createdAgo }}
				</span>
			</div>
			<div class="row">
				Save from
				<span :title="modified" class="info">
					{{ modifiedAgo }}
				</span>
			</div>
			<div class="row">
				Size: {{ backup.size }} MB
			</div>
		</div>

		<div class="actions">
			<FormButton @click="restoreBackup">
				Restore
			</FormButton>

			<FormButton red @click="deleteBackup">
				Delete
			</FormButton>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		props: {
			backup: Object
		},
		computed: {
			created() {
				return moment(this.backup.created).format('YYYY-MM-DD HH:mm:ss');
			},
			createdAgo() {
				return moment(this.backup.created).fromNow();
			},
			modified() {
				return moment(this.backup.modified).format('YYYY-MM-DD HH:mm:ss');
			},
			modifiedAgo() {
				return moment(this.backup.modified).fromNow();
			}
		},
		methods: {
			deleteBackup() {
				this.$emit('delete-backup', this.backup.folder);
			},
			restoreBackup() {
				this.$emit('restore-backup', this.backup.folder);
			}
		}
	};
</script>

<style scoped lang="scss">
	.backup-item {
		margin-top: 5px;
		background-color: $very-dark-blue;

		.header {
			padding: 5px;
			font-size: 13px;

			.info {
				font-weight: bold;
				cursor: pointer;
			}
		}

		.actions {
			display: flex;
			flex-wrap: wrap;
			padding: 3px;

			.form-button {
				flex: 1;
				margin: 2px;
			}
		}
	}
</style>
