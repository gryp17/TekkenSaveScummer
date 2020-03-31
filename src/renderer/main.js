import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: '<App/>'
}).$mount('#app');
