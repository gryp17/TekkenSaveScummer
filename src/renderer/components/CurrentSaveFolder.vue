<template>
	<div class="current-save-folder" @click="openFolder">
		<div class="inner-wrapper">
			<div class="icon-wrapper">
				<i class="fas fa-folder"></i>
				<div class="size">
					{{ stats.size }} MB
				</div>
			</div>
			<div class="info-wrapper">
				<div class="folder-name" :title="location">
					{{ stats.name }}
				</div>
				<div :title="created">
					Created: {{ createdAgo }}
				</div>
				<div :title="modified">
					Modified: {{ modifiedAgo }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { remote } from 'electron';
	import moment from 'moment';

	export default {
		props: {
			stats: Object,
			location: String
		},
		computed: {
			name() {
				return this.stats.name;
			},
			created() {
				return moment(this.stats.created).format('YYYY-MM-DD HH:mm:ss');
			},
			createdAgo() {
				return moment(this.stats.created).fromNow();
			},
			modified() {
				return moment(this.stats.modified).format('YYYY-MM-DD HH:mm:ss');
			},
			modifiedAgo() {
				return moment(this.stats.modified).fromNow();
			}
		},
		methods: {
			openFolder() {
				remote.shell.openItem(this.location);
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
		border-radius: 5px;
		cursor: pointer;

		.inner-wrapper {
			display: flex;

			.icon-wrapper {
				position: relative;
				text-align: center;

				.fa-folder {
					font-size: 75px;
				}

				.size {
					position: absolute;
					margin-top: 3px;
					left: 0;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					font-size: 10px;
					color: $white;
				}
			}

			.info-wrapper {
				padding-left: 20px;
				text-align: left;
				font-size: 14px;

				.folder-name {
					font-size: 26px;
					text-align: center;
				}
			}
		}
	}
</style>