module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				win: {
					icon: './build/icons/win/icon.ico'
				}
			}
		}
	},
	css: {
		loaderOptions: {
			sass: {
				//imports the provided scss files globally (in every vue component)
				//so you don't have to import them manually
				prependData: `
					@import '@/assets/_variables.scss';
				`
			}
		}
	}
};
