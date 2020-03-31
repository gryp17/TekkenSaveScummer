const state = {
	folder: null
};

const mutations = {
	SET_FOLDER(state, folder) {
		state.folder = folder;
	}
};

const actions = {
	setSaveFolder({ commit }, folder) {
		commit('SET_FOLDER', folder);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
