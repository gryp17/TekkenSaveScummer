<template>
	<div class="current-save-folder">
		<div class="inner-wrapper">
			<div class="icon-wrapper">
				<i class="fas fa-folder"></i>
			</div>
			<div class="info-wrapper">
				<div class="folder-name">
					{{ stats.name }}
				</div>
				<div>
					Created: {{ created }}
				</div>
				<div>
					Modified: {{ modified }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		props: {
			stats: Object
		},
		computed: {
			name() {
				return this.stats.name;
			},
			created() {
				//TODO: add title with full date as well
				return moment(this.stats.created).fromNow();
				//return moment(this.stats.created).format('YYYY MM DD HH:mm:ss');
			},
			modified() {
				return moment(this.stats.modified).fromNow();
				//return moment(this.stats.modified).format('YYYY MM DD HH:mm:ss');
			}
		}
	};
</script>

<style scoped lang="scss">
	.current-save-folder {
		display: inline-block;
		padding: 20px;
		color: $very-dark-blue;
		background-color: $yellow;

		.inner-wrapper {
			display: flex;

			.icon-wrapper {
				text-align: center;

				.fa-folder {
					font-size: 70px;
				}
			}

			.info-wrapper {
				padding-left: 20px;
				text-align: left;

				.folder-name {
					font-size: 26px;
					text-align: center;
				}
			}
		}
	}
</style>