import router from '@/router'
import { getToken } from '@/utils/token'
const whiteRoter = ['/login']
router.beforeEach((to, from, next) => {
	console.log(to)
	if (getToken('admin_token')) {
		//存在
		next()
	} else {
		//不存在
		console.log(getToken('admin_token'))
		//白名单校验
		if (whiteRoter.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
		}
	}
	next()
})
