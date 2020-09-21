import App from './App'
import Vue from 'vue'
import router from './router'

import {message} from './utils/resetMessage';
import 'element-ui/lib/theme-chalk/index.css';



// Vue.use(ELEMENT)

Vue.prototype.$message = message;

// import {message,notification} from 'ant-design-vue'
// import 'ant-design-vue/lib/message/style/css'; // 加载 CSS
// Vue.prototype.$message = message;
// Vue.prototype.$notification = notification;
// message.config({
//   top: `10px`,
//   duration:1.5,
//   maxCount: 1
// });


Vue.config.productionTip = false


axios.interceptors.request.use(function (config) {
  //window.localStorage.getItem("accessToken") 获取token的value
  let token = window.localStorage.getItem("token")
  console.log("requestinterceptors22=="+token)
  if (token) {
   
     config.headers.Authorization = token;     
      //也可以这种写法
      return config;
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});






  axios.defaults.baseURL = 'http://agric.v2.winoble.cn:8076/api/'
  // axios.defaults.baseURL = 'http://agric.v2.winoble.cn/api/'
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'


   // 拦截器处理请求
axios.interceptors.response.use(response => {
	if(response) {
		//成功
		switch (response.data.Status) {
            case 402: //与后台约定登录失效的返回码,根据实际情况处理
            // message.error(response.data.Msg)
            break;
        }
	}
	return response;
}, error => {
	//失败
	if(error.response) {
		switch (error.response.status) {
            case 403:
                // message.error('账号过期请重新登录')
                router.push('/login');
                localStorage.removeItem('token');
            break;
            case 500:
                  // message.error('服务器错误，请刷新')
            break;
        }
	}
})


new Vue({
	el: '#app',
  router,
	components: {
		App
	},
	template: '<App/>'
})
