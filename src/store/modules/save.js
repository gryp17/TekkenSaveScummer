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
	/**
	 * Resets the application configuration and deletes the backups directory
	 * @param {Object} context
	 * @returns {Promise}
	 */
	resetApp({ commit }) {
		return fs.remove(config.backupsDir).then(() => {
			commit('RESET_STATE');
			return true;
		}).catch(() => {
			return false;
		});
	},
	/**
	 * Sets the save folder
	 * @param {Object} context
	 * @param {String} folder
	 */
	setSaveFolder({ commit }, folder) {
		commit('SET_FOLDER', folder);
	},
	/**
	 * Sets the profile name
	 * @param {Object} context
	 * @param {Object} data
	 */
	setProfileName({ commit }, data) {
		commit('SET_PROFILE_NAME', data);
	},
	/**
	 * Checks if the directory exists
	 * @param {Object} context
	 * @param {String} directory
	 * @returns {Promise}
	 */
	directoryExists({ commit }, directory) {
		return fs.stat(directory).then((stats) => {
			return stats && stats.isDirectory();
		}).catch(() => {
			return false;
		});
	},
	/**
	 * Gets the save folder stats
	 * @param {Object} context
	 * @returns {Promise}
	 */
	getSaveFolderStats({ commit, dispatch, state }) {
		if (!state.folder) {
			return false;
		}

		return Promise.all([
			dispatch('getModifiedDate', state.folder),
			du(state.folder)
		]).then((results) => {
			const modified = results[0];
			const sizeInMB = ((results[1] / 1024) / 1024).toFixed(2);

			const folderStats = {
				name: state.folder.split('\\').pop(),
				modified,
				size: sizeInMB
			};

			commit('SET_FOLDER_STATS', folderStats);
			return folderStats;
		}).catch(() => {
			return false;
		});
	},
	/**
	 * Returns the modified date of the last modified file in the list
	 * @param {Object} context
	 * @param {String} folder
	 * @returns {Promise}
	 */
	getModifiedDate({ dispatch }, folder) {
		return dispatch('getDirectoryFiles', folder).then((files) => {
			const tasks = files.map((file) => {
				return fs.stat(file);
			});

			return Promise.all(tasks);
		}).then((stats) => {
			const orderedByDate = stats.sort((a, b) => {
				return a.mtime < b.mtime ? 1 : -1;
			});

			return orderedByDate[0].mtime;
		});
	},
	/**
	 * Returns all files in the provided directory recursively
	 * @param {Object} context
	 * @param {String} folder
	 * @returns {Promise}
	 */
	getDirectoryFiles({ dispatch }, folder) {
		return fs.readdir(folder, { withFileTypes: true }).then((items) => {
			const tasks = items.map((item) => {
				const itemPath = path.resolve(folder, item.name);
				if (item.isDirectory()) {
					return dispatch('getDirectoryFiles', itemPath);
				}

				return itemPath;
			});

			return Promise.all(tasks);
		}).then((files) => {
			return files.flat();
		});
	},
	/**
	 * Created a new backup
	 * @param {Object} context
	 * @param {Number} profile
	 * @returns {Promise}
	 */
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
	/**
	 * Deleted a backup
	 * @param {Object} context
	 * @param {Object} data
	 * @returns {Promise}
	 */
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
	},
	/**
	 * Restores a backup
	 * @param {Object} context
	 * @param {Object} data
	 * @returns {Promise}
	 */
	restoreBackup({ commit, dispatch, state }, { profile, folderName }) {
		const tempFolder = `${state.folder}_TEMP`;
		const backupFolder = path.join(config.backupsDir, folderName);

		//make a temp folder from the current save folder
		return fs.copy(state.folder, tempFolder)
			.then(() => {
				//delete the current save folder
				return fs.remove(state.folder);
			}).then(() => {
				//copy the backup folder
				return fs.copy(backupFolder, state.folder);
			}).then(() => {
				//remove the temp folder and fetch the new folder stats
				fs.remove(tempFolder);
				return dispatch('getSaveFolderStats');
			}).then((stats) => {
				return !!stats;
			}).catch(() => {
				//in case something fails - move back the backup files
				fs.copy(tempFolder, state.folder).then(() => {
					fs.remove(tempFolder);
				});

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
