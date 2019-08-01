import axios from 'axios'

export const baseURL =''
export const $http = axios.create({
    // baseURL:baseURL,
    timeout: 100000,
    'content-type': 'application/json;charset=UTF-8'
})
$http.interceptors.request.use(config => {
    return config
}, error => {
  console.log(error) 
  Promise.reject(error)
})

$http.interceptors.response.use(response => {
  console.log(response.data)
  return Promise.resolve(response.data)
}, error => {
  console.log(error)
  return Promise.reject(error)
})


// 创建axios实例
export const instance = axios.create({
    timeout: 20000,  
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 封装post
instance.interceptors.request.use(config => {
  if(config.method == 'post'){
    config.data = QS.stringify(config.data);
  }
  return config
}, error => {
  Message.error({
    message: '加载失败'
  });
  return Promise.reject(error)
});




