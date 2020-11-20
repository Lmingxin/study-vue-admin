import { getToken, setToken, removeToken } from '@/utils/token'
const USER = 'username'
const TOKEN = 'admin_token'
const app = {
	state: {
		isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
		token: getToken(TOKEN) || false,
		username: getToken(USER) || false,
	},
	getters: {
		getIsCollapse: (state) => state.isCollapse,
		getStoreToken: (state) => state.token,
		getStoreuserName: (state) => state.username,
	},
	mutations: {
		setIsCollapse(state) {
			state.isCollapse = !state.isCollapse
			sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
		},
		SET_USERNAME(state, data) {
			state.username = setToken(USER, data)
			state.username = data
		},
		SET_TOKEN(state, data) {
			state.token = setToken(TOKEN, data)
			state.token = data
		},
		REMOVE_USERINFO(state) {
			removeToken(USER)
			removeToken(TOKEN)
			state.token = ''
			state.username = ''
		},
	},
	actions: {
		SET_USER_TOKEN(content, data) {
			console.log(content)
			console.log(data)
			content.commit('SET_TOKEN', data.token)
			content.commit('SET_USERNAME', data.username)
		},
	},
	modules: {},
}

export default app
