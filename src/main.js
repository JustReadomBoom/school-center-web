import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router.js'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import qs from 'qs';
import moment from 'moment'
import cookie from 'js-cookie'
import 'bootstrap'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.prototype.Cook = cookie
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$moment = moment;
axios.defaults.withCredentials = false;
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
const router = new VueRouter({
    routes:Routes,
    mode:"history"
})



new Vue({
    router,
    render: h => h(App),
}).$mount('#app')


