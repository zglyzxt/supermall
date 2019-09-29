import  axios from 'axios'
// export function instance1(config,success,failture) {
// //创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   //发送真正的网络请求
//   instance(config)
//     .then(res => {
//        // console.log(res);
//        success(res)
//     })
//     .catch(err=>{
//        // console.log(err)
//        failture(err)
//     })
// }

export function request(config) {
//创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v1',
    timeout: 5000
  })
  //发送真正的网络请求
  // instance(config.baseConfig)
  //   .then(res => {
  //      config.success(res)
  //   })
  //   .catch(err=>{
  //      config.failture(err)
  //   })

  // 2.axios拦截器
  instance.interceptors.request.use(config => {
      // 1.config里的信息不符合服务器里的要求
      //2.比如每次发送网络请求的时候，都希望在界面显示一个请求的图标
      //3.某些网络请求（比如登陆（token）），必须携带一些特殊的信息
      return config
  },err => {
    console.log(err)
  })
  //2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}

