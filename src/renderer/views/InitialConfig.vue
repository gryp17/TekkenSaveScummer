<template>
	<div class="initial-config-page">
		<PageWrapper v-show="!loading">
			initial config page

			<div v-if="saveFound">
				Save found at {{ defaultSaveLocation }}
			</div>
			<div v-else>
				No tekken save was found.
				Please specify the tekken save location. (The default location is {{ defaultSaveLocation }})
			</div>
		</PageWrapper>
	</div>
</template>

<script>
	import util from 'util';
	import path from 'path';
	import fs from 'fs';
	import { remote } from 'electron';

	import PageWrapper from '@/components/PageWrapper';

	//all those need to be moved to a config
	const homeDir = remote.app.getPath('home');
	const localSubdir = '/AppData/Local/';
	const tekkenFolder = 'TekkenGame';

	export default {
		components: {
			PageWrapper
		},
		data() {
			return {
				loading: true,
				saveFound: false,
				defaultSaveLocation: path.join(homeDir, localSubdir, tekkenFolder)
			};
		},
		created() {
			this.directoryExists(this.defaultSaveLocation).then((exists) => {
				this.saveFound = exists;
				this.loading = false;
			});

			/*
			//TODO: check if the save location/config is OK and redirect to the save manager
			setTimeout(() => {
				this.$router.push({
					name: 'save-manager'
				});
			}, 5000);
			*/
		},
		methods: {
			directoryExists(directory) {
				const stat = util.promisify(fs.stat);

				return stat(directory).then((stats) => {
					return stats && stats.isDirectory();
				}).catch(() => {
					return false;
				});
			}
		}
	};
</script>