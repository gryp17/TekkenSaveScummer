module.exports = {
	//set custom app/window title
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = 'Tekken Save Scummer';
			return args;
		});
	},
	//set custom app icon
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
