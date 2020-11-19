import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index'
import Layout from '@/views/Layout/index'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: '',
		redirect: 'login',
		dispatch: true,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		dispatch: true,
		meta: {
			name: '登录',
		},
	},
	{
		path: '/index',
		name: 'Index',
		component: Layout,
		redirect: 'index',
		dispatch: false,
		alwaysShow: true,
		meta: {
			name: '首页',
		},
		children: [
			{
				path: '/index',
				name: 'Index',
				dispatch: false,
				component: () => import('@/views/Console/index'),
				meta: {
					name: '首页',
					icon: 'home',
				},
			},
		],
	},
	{
		path: '/info',
		name: 'Info',
		component: Layout,
		dispatch: false,
		meta: {
			name: '信息管理',
			icon: 'info',
		},
		children: [
			{
				path: '/infoIndex',
				name: 'InfoIndex',
				dispatch: false,
				component: () => import('@/views/Info/index'),
				meta: {
					name: '信息列表',
				},
			},
			{
				path: '/infoCategory',
				name: 'InfoCategory',
				dispatch: false,
				component: () => import('@/views/Info/category'),
				meta: {
					name: '信息分类',
				},
			},
		],
	},
	{
		path: '/user',
		name: 'User',
		dispatch: false,
		component: Layout,
		meta: {
			name: '用户管理',
		},
		children: [
			{
				path: '/userIndex',
				name: 'UserIndex',
				dispatch: false,
				component: () => import('@/views/User/index'),
				meta: {
					name: '用户列表',
					icon: 'user',
				},
			},
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
