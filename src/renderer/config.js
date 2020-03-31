import path from 'path';
import { remote } from 'electron';

const homeDir = remote.app.getPath('home');
const localSubdir = '/AppData/Local/';
const tekkenFolder = 'TekkenGame';

export default {
	homeDir,
	localSubdir,
	tekkenFolder,
	defaultSaveLocation: path.join(homeDir, localSubdir, tekkenFolder)
};
