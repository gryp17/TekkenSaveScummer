const getDefaultState = () => {
	return {
		folder: null,
		folderStats: null,
		profiles: [
			{
				name: 'main',
				backups: []
			}
		]
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_FOLDER(state, folder) {
		state.folder = folder;
	},
	SET_FOLDER_STATS(state, stats) {
		state.folderStats = stats;
	},
	ADD_BACKUP(state, { profile, folderName, modified }) {
		if (!state.profiles[profile]) {
			return;
		}

		state.profiles[profile].backups.push({
			folder: folderName,
			date: new Date(),
			modified
		});
	}
};

const actions = {
	resetState({ commit }) {
		commit('RESET_STATE');
	},
	setSaveFolder({ commit }, folder) {
		commit('SET_FOLDER', folder);
	},
	setFolderStats({ commit }, stats) {
		commit('SET_FOLDER_STATS', stats);
	},
	addBackup({ commit }, backup) {
		commit('ADD_BACKUP', backup);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
