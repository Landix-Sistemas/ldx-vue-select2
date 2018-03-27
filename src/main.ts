import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

// Intercepta todas as requisições ao WebService
axios.interceptors.request.use((request: any) => {
  // Do something before request is sent
  request.credentials = true;
  return request;
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
