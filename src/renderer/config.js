import path from 'path';
import { remote } from 'electron';

const appDir = remote.app.getAppPath().replace(/\\app.asar/i, '');
const homeDir = remote.app.getPath('home');
const localSubdir = '/AppData/Local/';
const tekkenFolder = 'TekkenGame';

export default {
	appDir,
	backupsDir: path.join(appDir, '/backups/'),
	homeDir,
	localSubdir,
	tekkenFolder,
	defaultSaveLocation: path.join(homeDir, localSubdir, tekkenFolder)
};
