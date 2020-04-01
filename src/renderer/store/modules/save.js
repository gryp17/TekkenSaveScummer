const state = {
	folder: null,
	folderStats: null
};

const mutations = {
	SET_FOLDER(state, folder) {
		state.folder = folder;
	},
	SET_FOLDER_STATS(state, stats) {
		state.folderStats = stats;
	}
};

const actions = {
	setSaveFolder({ commit }, folder) {
		commit('SET_FOLDER', folder);
	},
	setFolderStats({ commit }, stats) {
		commit('SET_FOLDER_STATS', stats);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
