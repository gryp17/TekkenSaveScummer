import fs from 'fs-extra';
import du from 'du';
import path from 'path';

import config from '@/config';

const getDefaultState = () => {
	return {
		folder: null,
		folderStats: null,
		profiles: [
			{
				name: 'Slot 1',
				backups: []
			},
			{
				name: 'Slot 2',
				backups: []
			},
			{
				name: 'Slot 3',
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
	SET_FOLDER(state, folderPath) {
		state.folder = folderPath;
	},
	SET_FOLDER_STATS(state, stats) {
		state.folderStats = stats;
	},
	SET_PROFILE_NAME(state, { profile, name }) {
		if (!state.profiles[profile]) {
			return;
		}

		state.profiles[profile].name = name;
	},
	ADD_BACKUP(state, { profile, folderName, created, modified, size }) {
		if (!state.profiles[profile]) {
			return;
		}

		state.profiles[profile].backups.unshift({
			folder: folderName,
			created,
			modified,
			size
		});
	},
	DELETE_BACKUP(state, { profile, folderName }) {
		if (!state.profiles[profile]) {
			return;
		}

		state.profiles[profile].backups = state.profiles[profile].backups.filter((backup) => {
			return backup.folder !== folderName;
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
	setProfileName({ commit }, data) {
		commit('SET_PROFILE_NAME', data);
	},
	directoryExists({ commit }, directory) {
		return fs.stat(directory).then((stats) => {
			return stats && stats.isDirectory();
		}).catch(() => {
			return false;
		});
	},
	getSaveFolderStats({ commit, state }) {
		if (!state.folder) {
			return false;
		}

		return Promise.all([
			fs.stat(state.folder),
			du(state.folder)
		]).then((results) => {
			const stats = results[0];
			const sizeInMB = ((results[1] / 1024) / 1024).toFixed(2);

			const folderStats = {
				name: state.folder.split('\\').pop(),
				created: stats.birthtime,
				//TODO: this will probably need to check the inner files as well
				modified: stats.mtime,
				size: sizeInMB
			};

			commit('SET_FOLDER_STATS', folderStats);
			return folderStats;
		}).catch(() => {
			return false;
		});
	},
	makeBackup({ commit, state }, profile) {
		return fs.mkdir(config.backupsDir).catch((err) => {
			return err;
		}).then((err) => {
			if (err && err.code !== 'EEXIST') {
				return false;
			}

			const date = Date.now();
			const folderName = `${profile}_${date}`;

			return fs.copy(state.folder, path.join(config.backupsDir, folderName)).then(() => {
				//insert the vuex record with the selected profile and save folder name
				const backup = {
					profile,
					folderName,
					created: new Date(),
					modified: state.folderStats.modified,
					size: state.folderStats.size
				};

				commit('ADD_BACKUP', backup);
				return backup;
			}).catch(() => {
				return false;
			});
		});
	},
	deleteBackup({ commit }, { profile, folderName }) {
		return fs.remove(path.join(config.backupsDir, folderName)).then(() => {
			commit('DELETE_BACKUP', {
				profile,
				folderName
			});

			return true;
		}).catch(() => {
			return false;
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
