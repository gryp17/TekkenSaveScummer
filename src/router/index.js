import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'initial-config',
			component: require('@/views/InitialConfig').default
		},
		{
			path: '/save-manager',
			name: 'save-manager',
			component: require('@/views/SaveManager').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});
