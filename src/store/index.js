import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
	modules,
	plugins: [
		createPersistedState()
		//createSharedMutations() //this shitty plugin doesn't work properly
	],
	strict: process.env.NODE_ENV !== 'production'
});
