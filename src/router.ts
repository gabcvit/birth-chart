import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ResultPage from './views/ResultPage.vue';

export const routes = [
	{ name: 'home', path: '/birth-chart', component: HomePage },
	{ name: 'result', path: '/birth-chart/result', component: ResultPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;