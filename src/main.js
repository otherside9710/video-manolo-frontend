import Vue from 'vue'
import App from './app/ui/App'
import router from './app/router/routes'
import '../public/assets/scss/main.scss'
import Toasted from 'vue-toasted';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false;
Vue.use(Toasted);
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
