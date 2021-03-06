import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Fragment from 'vue-fragment'
import 'element-ui/lib/theme-chalk/index.css'
import icons from '@/icons'
import routerInspect from '@/router/routerInspect'
Vue.config.productionTip = false
Vue.use(Fragment.Plugin)
Vue.use(VueCompositionApi)
Vue.use(ElementUI)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
